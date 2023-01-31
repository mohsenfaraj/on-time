import React from "react"

function AddTime(props) {
    const timeRef = React.createRef() ;

    function addTime(e) {
        e.preventDefault()
        const time = timeRef.current.value;
        props.addNewTime(time);
    }
    return (
        <div className="popup">
            <form>
            <div className="row">
                <h4>Add Time</h4>
            </div>
            <div className="row">
                <label htmlFor="time">new time:</label>
            <input type="text" name="time" id="time" ref={timeRef}/>
            </div>
            <div className="row">
                <input type="submit" value="add" onClick={addTime}/>
                <input type="button" value="close" onClick={props.close}/>
            </div>
            </form>
        </div>
    )
}
export default AddTime