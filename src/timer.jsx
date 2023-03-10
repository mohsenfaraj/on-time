import Countdown from "./countdown";
function Timer(props) {
    const times = props.timer.times.map((time , index) => 
        <li key={time.toString()} className={index === props.timeIndex ? "active" : ""}> <span>{time}</span></li>
    )
    return (
        <div className="container">
            <h2>{props.timer.name}</h2>
            <Countdown remaining={props.remaining} />
            <div className="grid">
            <ul>{times}</ul>
            </div>
        </div>
    );
}

export default Timer ;