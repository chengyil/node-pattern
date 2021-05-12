const fs = require('fs');
const path = require('path');
const superagent = require('superagent');
const mkdirp = require('mkdirp');
const {urlToFilename, getPageLinks} = require('@part3/utils');

function saveFile(filename, content, cb) {
  mkdirp(path.dirname(filename), (err) => {
    if (err) {
      return cb(err);
    }
    fs.writeFile(filename, content, cb);
  });
}

function download(url, filename, cb) {
  console.log(`Downloading ${url} into ${filename}`);
  superagent.get(url).end((err, res) => {
    if (err) {
      return cb(err);
    }
    return saveFile(filename, res.text, (err) => {
      if (err) {
        return cb(err);
      }
      cb(null, res.text);
    });
  });
}

function spiderLinks(currentUrl, body, nesting, cb) {
  if (nesting === 0) {
    return process.nextTick(cb);
  }
  const links = getPageLinks(currentUrl, body);
  if (links.lengths === 0) {
    return process.nextTick(cb);
  }

  let completed = 0;
  let hasError = false;

  function done(err) {
    if (err) {
      hasError = true;
      return cb(err);
    }

    completed +=1;

    if (completed === links.length && !hasError) {
      cb();
    }
  }

  links.forEach((link) => {
    spider(link, nesting - 1, done);
  });
}

function spider(url, nesting, cb) {
  const filename = urlToFilename(url);
  fs.readFile(filename, 'utf8', (err, fileContent) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        return cb(err);
      }

      return download(url, filename, (err, requestContent) => {
        if (err) {
          return cb(err);
        }
        spiderLinks(url, requestContent, nesting, cb);
      });
    }
    spiderLinks(url, fileContent, nesting, cb);
  });
};

module.exports = spider;
