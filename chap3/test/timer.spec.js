const Timer = require("@src/timer");
function createPromiseHandler () {
    let resolve, reject, promise;
    promise = new Promise((_resolve, _reject) => { [resolve, reject] = [_resolve, _reject];});

    return {
        resolve, reject, promise
    };
}

function createProfiler () {
    let startTime, stopTime, durationTime;

    return {
        start (){
            startTime = process.hrtime.bigint();
        },
        stop (){
            stopTime = process.hrtime.bigint();
        },
        duration () {
            if(!durationTime) { 
                durationTime = (stopTime - startTime) / 1000000n;
            }
            return durationTime; 
        },
        log() {
            console.log("time to complete : " + this.duration());
        }
    };

}
describe("timer", () => {
    it("should accept number and callback", () => {
        return new Promise(resolve => {
            const timer = new Timer(0, (count) => { 
                expect(count).toEqual(0);
                resolve();
            });
            timer.start();
        });
    });
    it("should receive 0 tick for totalTime 45 millisecond", () => {
        const promiseHandler = createPromiseHandler();
        const profiler = createProfiler();
        let count = 0;
        new Timer(45, () => {
            profiler.stop();
            expect(count).toEqual(0);
            profiler.log();
            expect(profiler.duration()).toBeLessThan(50);
            expect(profiler.duration()).toBeGreaterThanOrEqual(45);
            promiseHandler.resolve();
        }).on("tick", () => { count += 1;}).start();
        profiler.start();
        return promiseHandler.promise;
    });
    it("should receive 1 tick for totalTime 50 millisecond", () => {
        const promiseHandler = createPromiseHandler();
        const profiler = createProfiler();
        let count = 0;
        new Timer(50, () => {
            profiler.stop();
            expect(count).toEqual(1);
            profiler.log();
            expect(profiler.duration()).toBeLessThan(60);
            expect(profiler.duration()).toBeGreaterThanOrEqual(50);
            promiseHandler.resolve();
        }).on("tick", () => { count += 1;}).start();
        profiler.start();
        return promiseHandler.promise;
    });
    it("should receive 10 tick for totalTime 500 millisecond", () => {
        const promiseHandler = createPromiseHandler();
        const profiler = createProfiler();
        let count = 0;
        new Timer(500, () => {
            profiler.stop();
            expect(count).toEqual(10);
            profiler.log();
            expect(profiler.duration()).toBeLessThan(600);
            expect(profiler.duration()).toBeGreaterThanOrEqual(500);
            promiseHandler.resolve();
        }).on("tick", () => { count += 1;}).start();
        profiler.start();
        return promiseHandler.promise;
    });
    it("should receive 10 tick for totalTime 549 millisecond", () => {
        const promiseHandler = createPromiseHandler();
        const profiler = createProfiler();
        let count = 0;
        new Timer(549, () => {
            profiler.stop();
            expect(count).toEqual(10);
            expect(profiler.duration()).toBeLessThan(650);
            expect(profiler.duration()).toBeGreaterThanOrEqual(500);
            promiseHandler.resolve();
        }).on("tick", () => { count += 1;}).start();
        profiler.start();
        return promiseHandler.promise;
    });
});