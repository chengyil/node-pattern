const { readAsync } = require("../readAsync");
const OQueue = require("../oqueue");
const now = require("../profile");

module.exports = {
    runQueue () {
        function onData2(err, data) {
            if(err) {
                return console.log(err);
            }
            console.log(data.length);
        }
        function onData(err, data) {
            if(err) {
                return console.log(err);
            }
            console.log(data.length);
            readAsync("./data/data3.txt", onData2);
        }
        now("Before Async Read");
        readAsync("./data/data3.txt", onData);
        now("After Async Read");

        const queue = new OQueue()
            .onItemAdded((length) => console.log("item added", length))
            .onItemRemoved((length) => console.log("item removed", length));
        now(queue.push(1));
        now(queue.push(2));
        now(queue.pop());
    }
};