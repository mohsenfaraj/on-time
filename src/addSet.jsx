import React from "react"
function AddSet(props) {
    const nameRef = React.createRef()
    const backgroundColorRef = React.createRef()
    const timesRef = React.createRef()
    const form = React.createRef()

    function sortTimes(a , b) {
        const timeA = a.split(":") ;
        const timeB = b.split(":") ;
        if (timeA[0] == timeB[0]){
            return timeA[1] - timeB[1]
        }
        else {
            return timeA[0] - timeB[0]
        }
    }
    function addData(e) {
        e.preventDefault() ;
        const name = nameRef.current.value ;
        const bg = backgroundColorRef.current.value ;
        const timestxt = timesRef.current.value ;
        const times = timestxt.split("\n").map(item => item.trim()).sort(sortTimes);
        //#TODO : remove the duplicates
        const timeset = {
            name : name ,
            background : bg , 
            times : times ,
        }
        if (props.mode == "add"){
            props.addNewSet(timeset)
        }
        else if (props.mode == "update") {
            props.updateSet(timeset)
        }
        form.current.reset() 
        props.close()
    }
    function printTimes() {
        let text = "" 
        props.updating.times.forEach(time => {
            text += time + "\n"
        });
        text = text.trim()
        return text
    }
    return (
        <div className="popup">
            <form ref={form}>
            <div className="row">
                {props.mode == "add"?<h4>Add New Set</h4>:<h4>Update Existing Set</h4>}
            </div> 
                <div className="row">
                    <label htmlFor="name">name</label>
                    <input type="text" name="name" id="name" ref={nameRef} defaultValue={props.mode == "update"? props.updating.name : ""}/>
                </div>
                <div className="row">
                    <label htmlFor="bg">background</label>
                    <input type="text" name="background" id="bg" ref={backgroundColorRef} defaultValue={props.mode == "update"? props.updating.background : ""}/>
                </div>
                <div className="row">
                    <label htmlFor="times">times:</label>
                </div>
                <div className="row">
                    <textarea name="times" id="times" cols="30" rows="10" ref={timesRef} defaultValue={props.mode == "update"? printTimes() : ""}></textarea>
                </div>
                <div className="row">
                    <input type="submit" value={props.mode == "add" ? "Add" : "Update"} onClick={addData}/>
                    <input type="button" value="Cancel" onClick={props.close}/>
                </div>
            </form>
        </div>
    )
}

export default AddSet 