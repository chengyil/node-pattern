const Timer = require("@src/timer");
const {createProfiler, createPromiseHandler} = require("./testHelper");
describe("timer", () => {
    it("should accept number and callback", () => {
        return new Promise(resolve => {
            const timer = new Timer(0, (err, count) => { 
                expect(count).toEqual(1);
                resolve();
            });
            timer.start();
        });
    });
    it("should receive 1 tick for totalTime 45 millisecond", () => {
        const promiseHandler = createPromiseHandler();
        const profiler = createProfiler();
        let count = 0;
        new Timer(45, () => {
            profiler.stop();
            expect(count).toEqual(1);
            profiler.log();
            expect(profiler.duration()).toBeLessThan(55);
            expect(profiler.duration()).toBeGreaterThanOrEqual(45);
            promiseHandler.resolve();
        }).on("tick", () => { count += 1;}).start();
        profiler.start();
        return promiseHandler.promise;
    });
    it("should receive 2 tick for totalTime 50 millisecond", () => {
        const promiseHandler = createPromiseHandler();
        const profiler = createProfiler();
        let count = 0;
        new Timer(50, () => {
            profiler.stop();
            expect(count).toEqual(2);
            profiler.log();
            expect(profiler.duration()).toBeLessThan(65);
            expect(profiler.duration()).toBeGreaterThanOrEqual(50);
            promiseHandler.resolve();
        }).on("tick", () => { count += 1;}).start();
        profiler.start();
        return promiseHandler.promise;
    });
    it("should receive 11 tick for totalTime 500 millisecond", () => {
        const promiseHandler = createPromiseHandler();
        const profiler = createProfiler();
        let count = 0;
        new Timer(500, () => {
            profiler.stop();
            expect(count).toEqual(11);
            profiler.log();
            expect(profiler.duration()).toBeLessThan(800);
            expect(profiler.duration()).toBeGreaterThanOrEqual(500);
            promiseHandler.resolve();
        }).on("tick", () => { count += 1;}).start();
        profiler.start();
        return promiseHandler.promise;
    });
    it("should receive 11 tick for totalTime 549 millisecond", () => {
        const promiseHandler = createPromiseHandler();
        const profiler = createProfiler();
        let count = 0;
        new Timer(549, () => {
            profiler.stop();
            expect(count).toEqual(11);
            profiler.log();
            expect(profiler.duration()).toBeLessThan(800);
            expect(profiler.duration()).toBeGreaterThanOrEqual(500);
            promiseHandler.resolve();
        }).on("tick", () => { count += 1;}).start();
        profiler.start();
        return promiseHandler.promise;
    });
});