let intervalId = null;
let interval = 1000;
let callback = () => { };

const getTimeInMs = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const now = new Date();

    const targetTime = new Date();
    targetTime.setHours(hours, minutes, seconds, 0);

    if (targetTime < now) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    return targetTime.getTime() - now.getTime();
};

const startCorn = (fn, time, intervalMs = 1000) => {
    if (intervalId) {
        console.log("Job is already running...");
        return;
    }

    callback = fn;
    interval = intervalMs;

    const delay = getTimeInMs(time);

    console.log(`Job will start at ${time}`);

    setTimeout(() => {
        intervalId = setInterval(() => {
            console.log(`Running job at ${new Date().toLocaleTimeString()}`);
            callback();
        }, interval);

        console.log(`Job started! Running every ${interval / 1000} seconds.`);
    }, delay);
};

startCorn(
    () => console.log(`Calling the API`),
    "19:17:00",
    10000
);
