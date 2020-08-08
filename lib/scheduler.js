const cron = require('node-schedule');



exports.jobScheduler = function (dateTime, processJob) {

    try {
        cron.scheduleJob(dateTime, () => {
            processJob();
        });
    } catch (error) {
        console.log("Error in Scheduling Job", error);
    }
}
