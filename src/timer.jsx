import Countdown from "./countdown";
import { useState , useEffect} from "react";
function Timer(props) {
    const style = {backgroundColor : props.timer.background} ;
    const times = props.timer.times.map((time , index) => 
        <li key={time.toString()} className={index === props.timeIndex ? "active" : ""}>{time}</li>
    )     
    return (
        <div style={style}>
            <Countdown remaining={props.remaining} />
            <h2>{props.timer.name}</h2>
            <ul>{times}</ul>
        </div>
    );
}

export default Timer ;