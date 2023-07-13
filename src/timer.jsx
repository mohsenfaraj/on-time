function Timer(props) {
  const times = props.timer.times.map((time, index) => (
    <li key={time.toString()}>
      <div className={index === props.timeIndex ? "active timebox" : "timebox"}>
        <span>{time}</span>
        <span>10 Min</span>
      </div>
    </li>
  ));
  return (
    <>
      <h2>Daneshkadeh - UUT</h2>
      <div className="timesContainer">
        <ul>{times}</ul>
      </div>
    </>
  );
}

export default Timer;
