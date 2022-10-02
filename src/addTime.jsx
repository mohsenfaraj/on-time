import React from "react"

function AddTime(props) {
    const timeRef = React.createRef() ;

    function addTime(e) {
        e.preventDefault()
        const time = timeRef.current.value;
        props.addNewTime(time);
    }
    return (
        <form>
            <input type="text" name="time" id="time" ref={timeRef}/>
            <input type="submit" value="add" onClick={addTime}/>
            <input type="button" value="close" onClick={props.close}/>
        </form>
    )
}
export default AddTime