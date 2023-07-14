import { useEffect, useRef, useState } from "react";

function Timer({ timer, current }) {
  const [remaining, setRemaining] = useState(0);
  const [timeIndex, setTimeIndex] = useState();

  function closestTime(hour, min) {
    const timeList = timer.times;
    const total = hour * 60 + parseInt(min);
    for (let i = 0; i < timeList.length; i++) {
      const [targetHour, targetMin] = timeList[i].split(":");
      const target = targetHour * 60 + parseInt(targetMin);
      if (total < target) {
        return [timeList[i], i];
      } else if (total == target && i < timeList.length - 1) {
        return [timeList[i + 1], i + 1];
      } else if (i == timeList.length && total < target) {
        return [timeList[i], i];
      }
    }
    return [-1, -1];
  }

  function remainingTime(time) {
    let [hour, min] = time.split(":");
    hour = parseInt(hour);
    min = parseInt(min);
    const currentInt = current.getHours() * 60 + current.getMinutes();
    const target = hour * 60 + min;
    if (currentInt >= target) return "PASS";
    const remainingTime = target - currentInt;
    if (remainingTime / 60 > 1) {
      return `> ${Math.floor(remainingTime / 60)}hr`;
    } else if (remainingTime < 1) {
      return "< 1Min";
    } else {
      return remainingTime + " Min";
    }
  }

  const activebox = useRef();
  const timebox = useRef();

  useEffect(() => {
    const [target, index] = closestTime(
      current.getHours(),
      current.getMinutes()
    );
    setTimeIndex(index);
    // scroll to active timer
    if (activebox.current) {
      // console.log(activebox.current.offsetParent);
      timebox.current.scrollTo(0, activebox.current.offsetTop);
    } else {
      timebox.current.scrollTo(0, 0);
    }
  });
  const times = timer.times.map((time, index) => (
    <li key={time.toString()}>
      <div
        className={index === timeIndex ? "active timebox" : "timebox"}
        ref={index === timeIndex ? activebox : null}
      >
        <span>
          {remainingTime(time) == "PASS" ? <del>{time}</del> : <>{time}</>}
        </span>
        <span>{remainingTime(time)}</span>
      </div>
    </li>
  ));
  return (
    <>
      <h2>
        {timer.origin} - {timer.destiny}
      </h2>
      <div className="timesContainer" ref={timebox}>
        <ul>{times}</ul>
      </div>
    </>
  );
}

export default Timer;
