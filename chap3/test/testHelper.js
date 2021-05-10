module.exports = {
    createPromiseHandler () {
        let resolve, reject, promise;
        promise = new Promise((_resolve, _reject) => { [resolve, reject] = [_resolve, _reject];});

        return {
            resolve, reject, promise
        };
    },
    createProfiler () {
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
};

