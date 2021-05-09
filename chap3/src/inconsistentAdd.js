const process = require("process");

const cache = new Map();
function inconsistentAdd (a, b, cb) {
    const key = `${a},${b}`;
    if(cache.has(key)) {
        console.log("sync");
        cb(cache.get(key));
    } else {
        process.nextTick(() => { 
            console.log("async");
            cache.set(key, a + b);
            cb(a + b);
        });
    }
}

module.exports = {
    createAdder (a, b) {
        const listeners = [];
        inconsistentAdd(a, b, value => {
            listeners.forEach(listener => listener(value));
        });
        return {
            onDataReady(listener) { 
                listeners.push(listener);
                return this;
            }
        };
    }
};