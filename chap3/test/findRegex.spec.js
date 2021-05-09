const {once} = require("events");
const FindRegex = require("@src/findRegex");

describe("FindRegex", () => {
    it("should emit fileread, when read", () => {
        const finder = new FindRegex();
        finder.addFile("./test/data/test.txt");
        return new Promise((resolve) => {
            finder.find();
            finder.once("fileread", (file) => {
                expect(file).toEqual("./test/data/test.txt");
                resolve();
            });
        });
    });
    it("should emit start, when start finding", () => {
        const finder = new FindRegex();
        finder.addFile("./test/data/test.txt");
        finder.find();
        return once(finder, "start").then((files) => {
            expect(files[0]).toEqual(["./test/data/test.txt"]);
        });
    });
});