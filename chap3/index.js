const {EventEmitter, once} = require("events");
const process = require("process");
// const path = require("path");

// const { concatFiles } = require("./src/concat");
// concatFiles(
//     "concatFile.txt", 
//     (paths, dest) => {
//         console.log("In CB", {paths, dest});
//     }, 
//     path.resolve(__dirname, "./data/file1.txt"), 
//     path.resolve(__dirname, "./data/file2.txt"),
//     path.resolve(__dirname,"./data/file3.txt")
// );

// const { 
//     createAdder 
// } = require("./src/inconsistentAdd.js");

// createAdder(1,2)
//     .onDataReady(total =>  { 
//         console.log("listen 1", {total});
//         createAdder(1,2)
//             .onDataReady(total => console.log("listen 2", {total}));
//     });

function readJSON(data, callback) {
    process.nextTick(() => {
        let result;
        try {
            result = JSON.parse(data);
        } catch (err) {
            return callback(err);
        }
        callback(null, result);
    });
}

readJSON("{}", (err, json) => {
    if(err) console.log(err);
    else {
        console.log("data");
        console.log({ json});
    }
});

class JsonReader extends EventEmitter{
    constructor() {
        super();
        this.datas = [];
    }
    addData(data) {
        this.datas.push(data);
    }
    parse() {
        this.datas.forEach(data =>{
            process.nextTick(() => {
                try {
                    let result = JSON.parse(data);
                    this.emit("data", result);
                } catch (err){
                    this.emit("error", err);
                }
            });
        });
        this.emit("complete");
    }
}


const reader = new JsonReader();
reader.addData("{");
reader.parse();
once(reader, "data")
    .then(data => console.log(data))
    .catch(err => console.error("err", {err}));
