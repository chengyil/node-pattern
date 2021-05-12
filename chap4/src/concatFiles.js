const fs = require('fs');

function each(items, iterate, done) {
  function nextCb(index) {
    if (index === items.length) {
      return done();
    }
    iterate(items[index], (err) => {
      if (err) {
        return done(err);
      }
      nextCb(index + 1);
    });
  }
  nextCb(0);
}

function eachFile(files, cb, done) {
  each(files, (file, nextCb) => {
    fs.readFile(file, 'utf-8', (err, content) => {
      if (err) {
        return nextCb(err);
      }
      cb(content, nextCb);
    });
  }, done );
}

module.exports = function concatFiles(...args) {
  const cb = args.pop();
  const dest = args.pop();
  const files = args;

  return fs.open(dest, 'w', (err, fd) => {
    if (err) {
      return cb(err);
    }
    eachFile(files, (content, nextCb) => {
      fs.appendFile(fd, content, (err) => {
        if (err) {
          return nextCb(err);
        }
        return nextCb();
      });
    }, cb );
  });
};
