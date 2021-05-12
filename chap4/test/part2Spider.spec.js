const spider = require('@part2/spider.js');
const fs = require('fs');
const mkdirp = require('mkdirp');
jest.mock('mkdirp');
mkdirp.mockImplementation((path, cb)=> {
  return cb();
});
describe('part2', () => {
  it('should spider subpages', (done) => {
    fs.writeFile = jest.fn().mockImplementation((filename, response, cb) => {
      cb(null);
    });
    fs.readFile = jest.fn().mockImplementation((filename, encoding, cb) => {
      cb({code: 'ENOENT'});
    });
    spider('https://www.nea.gov.sg/weather', 1, (err) => {
      expect(err).toBe(undefined);
      done();
    });
  });
});
