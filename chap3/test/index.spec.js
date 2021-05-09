const {EventEmitter, once} = require("events");

describe("Emitter", () => {
    it("emit are sync", ()=> {
        const emitter = new EventEmitter();
        console.log(2);
        console.log(1);
        emitter.emit("data",1,2,3,4);
        emitter.once("data", (...args) => {
            console.log(3);
            expect.fail("should not call this");
        });
        console.log(4);
    });
});