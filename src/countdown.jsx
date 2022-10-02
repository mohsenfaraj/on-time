function Countdown(props) {
    if (props.remaining < 0) {
        return (
            <div>
                <h1>No Bus for you!</h1>
                <p>there will be no bus after this time... sorry mate!</p>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Remaining Time:</h1>
                {props.remaining < 0 && 
                <p>
                    no bus will arrive after this time!
                </p>
                }
                <p>{Math.floor(props.remaining/60)} Minitues and {props.remaining%60} Seconds</p>
            </div>
          );
    }
}
export default Countdown ;