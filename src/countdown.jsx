function Countdown(props) {
    if (props.remaining < 0) {
        return (
            <div>
                <h3>No Bus Found!</h3>
                <p>there will be no bus after this time.</p>
            </div>
        )
    }
    else if (props.remaining/3600 > 1) {
        return (
            <div>
                <h3>Remaining Time: More than one Hour!</h3>
            </div>
          );
    }
    else {
        return (
            <div>
                <h3>Remaining Time: {Math.floor(props.remaining/60)} Minitues and {props.remaining%60} Seconds</h3>
            </div>
          );
    }
}
export default Countdown ;