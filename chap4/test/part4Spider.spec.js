const spider = require('@part4/spider');
const TaskQueue = require('@part4/TaskQueue');
const fs = require('fs');

// const mkdirp = require('mkdirp');
// jest.mock('mkdirp');
// mkdirp.mockImplementation((path, cb)=> {
//   return cb();
// });


describe('part4', () => {
  it('should spider subpages', (done) => {
    // fs.writeFile = jest.fn().mockImplementation((filename, response, cb) => {
    //   cb(null);
    // });
    // fs.readFile = jest.fn().mockImplementation((filename, encoding, cb) => {
    //   cb({code: 'ENOENT'});
    // });
    const taskQueue = new TaskQueue(5);

    spider('https://www.nea.gov.sg/weather', 2, taskQueue);
    taskQueue.once('empty', () => {
      console.log('done');
      done();
    });
  });
});
