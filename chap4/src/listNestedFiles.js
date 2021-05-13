const {EventEmitter} = require('events');
const fs = require('fs');
const path = require('path');

class TaskQueue extends EventEmitter {
  constructor(concurrent) {
    super();
    this.tasks = [];
    this.concurrent = concurrent;
    this.currentWorker = 0;
  }

  pushTask(task) {
    this.tasks.push(task);
    process.nextTick(() => {
      this.next();
    });
    return this;
  }

  hasNoWork() {
    return this.currentWorker === 0 && this.tasks.length === 0;
  }

  hasWorker() {
    return this.concurrent > this.currentWorker;
  }

  hasTasks() {
    return this.tasks.length > 0;
  }

  next() {
    if (this.hasNoWork()) {
      this.emit('empty');
    }
    while (this.hasWorker() && this.hasTasks()) {
      const task = this.tasks.shift();
      this.currentWorker +=1;
      task((err) => {
        if (err) {
          this.emit(err);
        }
        this.currentWorker -=1;
        this.next();
      });
    }
  }
}

function listFileTask(dir, queue, allFiles, cb) {
  fs.readdir(dir, {withFileTypes: true}, (err, files) => {
    if (err) {
      return cb(err);
    }
    files.forEach((file) => {
      const fullpath = path.join(dir, file.name);
      if (file.isDirectory()) {
        queue.pushTask((done) => {
          listFileTask(fullpath, queue, allFiles, done);
        });
      } else if (file.isFile()) {
        allFiles.push(fullpath);
      }
    });
    cb();
  });
}

module.exports = function listNestedFiles(dir, cb) {
  const taskQueue = new TaskQueue(2);
  const allFiles = [];
  taskQueue.pushTask((done) => {
    listFileTask(dir, taskQueue, allFiles, done);
  });
  taskQueue.once('empty', () => cb(null, allFiles));
};
