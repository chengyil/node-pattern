const spider = require('@part1/spider.js');
const fs = require('fs');
const mkdirp = require('mkdirp');

jest.mock('mkdirp');
mkdirp.mockImplementation((path, cb)=> {
  return cb();
});

describe('part1', () => {
  it('should download file if it has not been cache before', (done) => {
    fs.writeFile = jest.fn().mockImplementation((filename, response, cb) => {
      cb(null);
    });
    spider('https://www.nea.gov.sg/weather', (err, filename, downloaded) => {
      expect(err).toBe(null);
      expect(downloaded).toBe(true);
      expect(filename).toEqual('www.nea.gov.sg/weather.html');
      done();
    });
  });
  it('should return downloaded false if it has been cache before', (done) => {
    fs.access = jest.fn().mockImplementation((path, cb) => {
      cb();
    });
    spider('https://www.nea.gov.sg/weather', (err, filename, downloaded) => {
      expect(err).toBe(null);
      expect(downloaded).toBe(false);
      expect(filename).toEqual('www.nea.gov.sg/weather.html');
      done();
    });
  });
});
