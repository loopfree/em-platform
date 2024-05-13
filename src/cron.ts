import { CronJob } from "cron";

console.log("CRON RUNNING...");

/**
 * "* * * * * *"
 * asterisk pertama => second
 * minute
 * hour
 * day
 * month
 * "0 * * * * *" => run setiap detik ke-0
 */
const job = CronJob.from({
  cronTime: "* 0 * * * *", // perjam atau menit ke 0
  onTick: async function () {
    try {
      const response = await fetch("http://localhost:3000/api/deleteExpired", {
        method: "DELETE",
      });
      const message = await response.json();
      console.log(message);
    } catch (e) {
      console.error(e);
    }
  },
  start: true,
  timeZone: "Asia/Jakarta",
});
