const cron = require('node-schedule');



exports.jobScheduler = function (dateTime, processJob) {

    try {
        cron.scheduleJob(dateTime, () => {
            console.log("Processing Job");
            processJob();
        });
        console.log("Job Scheduled For Given Date Time -->>", dateTime);
    } catch (error) {
        console.log("Error in Scheduling Job", error);
    }
}
