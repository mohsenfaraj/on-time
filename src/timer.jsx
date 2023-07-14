import { useEffect, useRef } from "react";

function Timer(props) {
  const activebox = useRef();
  const timebox = useRef();

  useEffect(() => {
    // scroll to active timer
    if (activebox.current) {
      timebox.current.scrollTo(0, activebox.current.offsetTop);
    } else {
      timebox.current.scrollTo(0, 0);
    }
  });
  const times = props.timer.times.map((time, index) => (
    <li key={time.toString()}>
      <div
        className={index === props.timeIndex ? "active timebox" : "timebox"}
        ref={index === props.timeIndex ? activebox : null}
      >
        <span>{time}</span>
        <span>10 Min</span>
      </div>
    </li>
  ));
  return (
    <>
      <h2>
        {props.timer.origin} - {props.timer.destiny}
      </h2>
      <div className="timesContainer" ref={timebox}>
        <ul>{times}</ul>
      </div>
    </>
  );
}

export default Timer;
