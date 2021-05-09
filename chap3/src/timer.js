const { EventEmitter} = require("events");
const { nextTick } = require("process");

const INTERVAL = 50;

const STATE = {
    NEW: "new",
    PENDING: "pending",
    COMPLETED: "completed",
};

const EVENTS = {
    TICK: "tick",
    COMPLETE: "complete"
};

module.exports = class Timer extends EventEmitter{
    constructor(totalTime, callback) {
        super();
        this.count = 0;
        this.timeLeft = totalTime;
        this.callback = callback;
        this.state = STATE.NEW;
        this.intervalId = null;
    }

    start() {
        if(this.isNew()) {
            nextTick(() => this.doTick());
            this.tickOrComplete();
        } else {
            return false;
        }
        return true;
    }

    isNew() {
        return this.state === STATE.NEW;
    }

    isComplete() {
        return this.state === STATE.COMPLETED;
    }

    hasTimeToTick () {
        return this.timeLeft >= INTERVAL;
    }

    tick() {
        this.intervalId = setInterval(() => { 
            this.timeLeft -= INTERVAL;
            this.doTick();
            this.continueTickOrComplete();
        }, INTERVAL);
    }

    doTick() {
        this.count += 1;
        this.emit(EVENTS.TICK);

    }

    continueTickOrComplete() {
        if(!this.hasTimeToTick()) { 
            clearInterval(this.intervalId);
            this.complete();
        }
    }

    complete() {
        setTimeout(() => { 
            this.emit(EVENTS.COMPLETE, this.count);
            this.callback(this.count);
        }, this.timeLeft);
    }

    tickOrComplete() {
        if(this.hasTimeToTick()) {
            this.tick();
        } else {
            this.complete();
        }
    }
};
