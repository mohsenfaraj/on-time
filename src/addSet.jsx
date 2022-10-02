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
    }
    return (
        <form ref={form}>
        <label htmlFor="name">name</label>
        <input type="text" name="name" id="name" ref={nameRef}/>
        <label htmlFor="bg">background color</label>
        <input type="text" name="background" id="bg" ref={backgroundColorRef}/>
        <label htmlFor="times">times</label>
        <textarea name="times" id="times" cols="30" rows="10" ref={timesRef}></textarea>
        <input type="submit" value="add" onClick={addData}/>
        <input type="button" value="close" onClick={props.close}/>
      </form>
    )
}

export default AddSet 