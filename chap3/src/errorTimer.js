const Timer = require("./timer");
const { EVENTS, ERROR_MSG} = require("./timer/constant");

function * createDefaultScheduler () {
    while(true) {
        yield Date.now();
    }
}

module.exports = class ErrorTimer extends Timer{
    constructor(totalTime, { scheduler }, callback) {
        super(totalTime, callback);
        this.scheduler = scheduler || createDefaultScheduler();
    }

    doTick() {
        if(!(this.getTimeStamp() % 5)) {
            clearInterval(this.intervalId);
            this.emit("error", ERROR_MSG);
            this.callback(ERROR_MSG);
        } else {
            this.count += 1;
            this.emit(EVENTS.TICK);
        }
    }

    getTimeStamp() {
        return this.scheduler.next().value;
    }
};