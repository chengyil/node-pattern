const concatFiles = require('@src/concatFiles');
const fs = require('fs');
describe('concatFiles', () => {
  let buffer = '';
  beforeEach(() => {
    buffer = '';
    fs.readFile = jest.fn().mockImplementation((filename, encoding, cb) => {
      let result;
      switch (filename) {
        case 'file1.txt': result = 'foo';
          break;
        case 'file2.txt': result = 'bar';
          break;
        case 'file3.txt': result = 'world';
          break;
      }
      cb(null, result);
    });
    fs.appendFile = jest.fn().mockImplementation((fd, content, cb) => {
      buffer = buffer + content;
      cb();
    });
    fs.open = jest.fn().mockImplementation((filename, mode, cb) => {
      cb(null, 3);
    });
  });
  it('should concat a list of files in order', (done) => {
    concatFiles('file1.txt',
        'file2.txt',
        'file3.txt',
        'combined.txt',
        (err) => {
          expect(err).toEqual(undefined);
          expect(buffer).toEqual('foobarworld');
          done();
        });
  });
});
