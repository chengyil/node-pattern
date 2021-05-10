const ErrorTimer = require("@src/errorTimer");
const { ERROR_MSG} = require("@src/timer/constant");

const {createPromiseHandler} = require("./testHelper");
describe("ErrorTimer", () => {
    it("should accept time, scheduler and callback", () => {
        function * generate () {
            yield 1;
        }

        const errorTimer = new ErrorTimer(0,{scheduler: generate() }, (err, count) => {
            expect(count).toEqual(1);
            handler.resolve();
        });
        const handler = createPromiseHandler();
        errorTimer.start();
        return handler.promise;
    });


    it("should set error in callback if scheduler return timestamp divisiable by 5", () => {
        function * generate () {
            yield 10;
        }

        const errorTimer = new ErrorTimer(100,{scheduler: generate() }, (err, count) => {
            expect(count).toEqual(undefined);
            expect(err).toEqual(ERROR_MSG);
            handler.resolve();
        });
        errorTimer.on("error", () => {});
        const handler = createPromiseHandler();
        errorTimer.start();
        return handler.promise;
    });

    it("should emit if scheduler return timestamp divisiable by 5", () => {
        function * generate () {
            yield 10;
        }

        const errorTimer = new ErrorTimer(100,{scheduler: generate() }, (err, count) => {
            expect(count).toEqual(undefined);
            expect(err).toEqual(ERROR_MSG);
        });
        errorTimer.on("error", (err) => {
            expect(err).toEqual(ERROR_MSG);
            handler.resolve();
        });
        const handler = createPromiseHandler();
        errorTimer.start();
        return handler.promise;
    });
});