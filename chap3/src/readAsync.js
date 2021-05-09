const now = require("./profile");
const fs = require("fs");
const cache = {};

module.exports = {
    cache() {
        return cache;
    },
    readAsync(file, cb) {
        if(cache[file]) {
            now("from cache");
            return process.nextTick(() => { 
                now("next tick from cache");
                cb(null, cache[file]);
            });
        }
        now("Before Reading");
        fs.readFile(file, "utf-8", (err, data) => {
            now("Readed");
            if(err) {
                return cb(err);
            }
            cache[file] = data;
            return cb(null, cache[file]);
        });
    },
};