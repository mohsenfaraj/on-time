import * as XLSX from "xlsx";

export type scheduleType = {
  origin: string;
  destiny: string;
  times: string[];
  subSchedule: {
    name: string;
    times: string[];
  }[];
};

export async function loadTimes(urls: string[]) {
  let data: scheduleType[] = [];
  const times = await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert to CSV
        const csv = XLSX.utils.sheet_to_csv(worksheet, { blankrows: false });

        csv
          .trim()
          .split("\n")
          .forEach((row, rowIndex) => {
            row.split(",").forEach((cell, cellIndex, rowArr) => {
              if (rowIndex === 0) {
                // Initialize day names on the first row
                let destiny =
                  cellIndex % 2 == 0
                    ? rowArr[cellIndex + 1]
                    : rowArr[cellIndex - 1];
                data.push({
                  origin: cell.trim(),
                  destiny: destiny.trim(),
                  times: [],
                  subSchedule: [],
                });
              } else if (cell && cell !== "-") {
                // Add valid time entries
                data[cellIndex].times.push(formatTime(cell));
              }
            });
          });

        // check if the schedule is day-specific
        data = data.filter((item, arrIndex) => {
          const [title, day] = regexCheck(item.origin);
          const [destinyTitle, destinyDay] = regexCheck(item.destiny);
          if (title) {
            // find and append the data as subschedule to the proper schedule
            let index = data.findIndex((item) => {
              return item.origin == title && item.destiny == destinyTitle;
            });
            data[index].subSchedule.push({ name: day, times: item.times });
            return false;
          }
          return true;
        });

        // TODO: sort times and merge day-specific schedules with others
        // Sort times for each day
        // data.forEach((day) => {
        //   day.times.sort((a, b) => (a > b ? 1 : -1));
        // });

        return data;
      } catch (error) {
        console.error("Error fetching .xlsx data:", error);
        return null;
      }
    })
  );

  // Filter out any null results due to errors
  return data.filter(Boolean);
}

// Helper function to format time strings to HH:MM
function formatTime(time: string) {
  if (typeof time === "number") {
    const totalMinutes = Math.round(time * 24 * 60);
    const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
    const minutes = String(totalMinutes % 60).padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  return time;
}

function regexCheck(text: string): [string, string] | [null, null] {
  const regex = /^(.*)\((شنبه|یکشنبه|دوشنبه|سه‌شنبه|چهارشنبه|پنجشنبه|جمعه)\)$/;
  let arr = regex.exec(text);
  if (arr != null) {
    let title = arr[1].trim();
    let day = arr[2].trim();
    return [title, day];
  } else return [null, null];
}
