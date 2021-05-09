const { EventEmitter } = require("events");

module.exports = class OQueue extends EventEmitter {
    constructor () {
        super();
        this.queue = []; 
    }

    onItemAdded(cb) {
        this.on("item-added", cb);
        return this;
    }

    onItemRemoved(cb) {
        this.on("item-removed", cb);
        return this;
    }

    push(item) {
        this.queue.push(item);
        this.emit("item-added", this.queue.length);
    }

    pop() {
        const item =this.queue.shift();
        this.emit("item-removed", this.queue.length);
        return item;
    }
};