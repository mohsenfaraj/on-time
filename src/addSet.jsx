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
        props.addNewSet(timeset)
        
        form.current.reset() 
        props.close() ;
    }
    return (
        <div className="popup">
            <form ref={form}>
            <div className="row">
                <h4>Add New Set</h4>
            </div> 
                <div className="row">
                    <label htmlFor="name">name</label>
                    <input type="text" name="name" id="name" ref={nameRef}/>
                </div>
                <div className="row">
                    <label htmlFor="bg">background</label>
                    <input type="text" name="background" id="bg" ref={backgroundColorRef}/>
                </div>
                <div className="row">
                    <label htmlFor="times">times:</label>
                </div>
                <div className="row">
                    <textarea name="times" id="times" cols="30" rows="10" ref={timesRef}></textarea>
                </div>
                <div className="row">
                    <input type="submit" value="Add" onClick={addData}/>
                    <input type="button" value="Cancel" onClick={props.close}/>
                </div>
            </form>
        </div>
    )
}

export default AddSet 