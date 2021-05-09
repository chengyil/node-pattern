const { nextTick} = require("process");
const { EventEmitter} = require("events");
const { readFile} = require("fs").promises;

module.exports = class FindRegex extends EventEmitter {
    constructor(regex) {
        super();
        this.filePaths = [];
        this.regex = regex;
    }

    addFile(path) {
        this.filePaths.push(path);
    }

    find() {
        nextTick(() => this.emit("start",this.filePaths ));
        this.filePaths.forEach((file) => this.process(file));
    }

    async process(path) {
        let content;
        console.log("processing");
        try {
            console.log("reading");
            content = await readFile(path, {encoding: "utf-8", flag: "r"});
            this.emit("fileread", path);
            const match = content.match(this.regex);
            if(match) {
                match.forEach(elem => this.emit("found", file, elem));
            }
        } catch (err) {
            this.emit("error", err);
        }
    }
};
