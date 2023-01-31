import Countdown from "./countdown";
function Timer(props) {
    const style = {
        backgroundColor : props.timer.background ,
        padding : "5px" , 
    
    } ;
    const times = props.timer.times.map((time , index) => 
        <li key={time.toString()} className={index === props.timeIndex ? "active" : ""}>{time}</li>
    )     
    return (
        <div style={style}>
            <h2>{props.timer.name}</h2>
            <Countdown remaining={props.remaining} />
            <ul>{times}</ul>
        </div>
    );
}

export default Timer ;