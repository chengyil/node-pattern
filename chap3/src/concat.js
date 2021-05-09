const fs = require("fs");

module.exports = {
    concatFiles (dest, cb, ...paths) {
        fs.readFile

        console.log("dest", {dest, paths});
        cb(paths, dest);
    }
};