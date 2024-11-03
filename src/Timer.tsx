import { useEffect, useRef, useState, memo, useCallback } from "react";
import { scheduleType } from "./xlsxLoader";
function Timer({ timer }: { timer: scheduleType }) {
  const [current, setCurrent] = useState(new Date());
  const [timeIndex, setTimeIndex] = useState(0);
  const timerRef = useRef(0);

  type closestTime = (hour: number, min: number) => number[];
  // This function only depends on `timer.times`, so we use useCallback to avoid re-creating it.
  const closestTime = useCallback(
    (hour: number, min: number): [string, number] => {
      const timeList = timer.times;
      const total = hour * 60 + min;
      for (let i = 0; i < timeList.length; i++) {
        const [targetHour, targetMin] = timeList[i].split(":");
        const target = parseInt(targetHour) * 60 + parseInt(targetMin);
        if (total < target) {
          return [timeList[i], i];
        } else if (total === target && i < timeList.length - 1) {
          return [timeList[i + 1], i + 1];
        }
      }
      return ["-1", -1];
    },
    [timer.times]
  );

  const calcRemainingTime = useCallback(
    (time: string) => {
      if (!time) return;
      let [hour, min] = time.split(":").map((item) => parseInt(item));
      const currentInt =
        current.getHours() * 3600 +
        current.getMinutes() * 60 +
        current.getSeconds();
      const target = hour * 3600 + min * 60;
      const remainingTime = target - currentInt;
      const remainingHour = Math.floor(remainingTime / 3600);
      Math.floor(remainingTime / 3600);
      if (currentInt >= target) return "PASS";
      if (remainingHour > 0) {
        return "بیشتر از یک ساعت";
      }
      return `${remainingHour > 0 ? `${remainingHour} ساعت،` : ""} ${Math.floor(
        (remainingTime % 3600) / 60
      )} دقیقه، ${Math.floor((remainingTime % 3600) % 60)} ثانیه`;
    },
    [current]
  );

  // Effect to update `current` every second without affecting the parent component
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(new Date());
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  // Effect to calculate the closest time only when `timer.times` changes
  useEffect(() => {
    const [target, index] = closestTime(
      current.getHours(),
      current.getMinutes()
    );
    setTimeIndex(index);
  }, [closestTime, current]);

  const times = timer.times.map((time, index) => (
    <li key={time.toString()}>
      <div className={index === timeIndex ? "active timebox" : "timebox"}>
        <span>{time}</span>
      </div>
    </li>
  ));

  return (
    <>
      <h2>{`${timer.origin} به ${timer.destiny}`}</h2>
      <div className="timesContainer">
        {timeIndex > 0 ? (
          <p>زمان باقی‌مانده: {calcRemainingTime(timer.times[timeIndex])}</p>
        ) : (
          <p>اتوبوسی پس از این زمان نیست!</p>
        )}
        <ul>{times}</ul>
      </div>
    </>
  );
}

export default memo(Timer);
