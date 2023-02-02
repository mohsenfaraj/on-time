import { useState , useEffect, useMemo } from 'react'
import Timer from './timer'
import AddSet from './addSet'
import "./style.css"

const UUT_SCHEDULE = [{
  name : "Daneshkade" ,
  color: "#326cd8" ,
  times : ["7:35" , "8:40" , "9:05" , "9:55" , "10:35" , "11:20" , "11:50" , "12:20" ,
  "12:50" , "13:20" , "13:40" , "14:10" , "14:50" , "15:30" , "15:50" , "16:10" ,
  "16:25" , "16:45" , "17:05"]
} , 
{
  name:"UUT" ,
  color : "#d83232" , 
  times : ["8:20" , "8:45" , "9:35" , "10:15" , "11:00" , "11:30" , "12:00" , "12:30" ,
  "13:00" , "13:20" , "13:50" , "14:30" , "15:10" , "15:30" , "15:50" , "16:05" ,
  "16:25" , "16:45" , "17:40" , "18:15" , "19:10"]
}]
function App() {
  const [times , setTimes] = useState([])
  const [activeTimer , setactiveTimer] = useState(0)
  const [addSetWindow , setAddSetWindow] = useState(false)
  const [editWindow , setEditWindow] = useState(false)
  const [remaining , setRemaining] = useState(0) ;
  function prevTimer(e) {
    if (activeTimer !== 0)
    setactiveTimer(activeTimer - 1) ;
  }
  
  function nextTimer(e) {
    if (activeTimer + 1 < times.length) {
      setactiveTimer(activeTimer + 1)
    }
  }

  function showAddSet(e) {
    closeModal()
    setAddSetWindow(true)
  }

  function closeModal(e) {
    setAddSetWindow(false)
    setEditWindow(false)
  }

  function addNewSet(timeset) {
    const newTimes = [...times]
    newTimes.push(timeset)
    setTimes(newTimes)
  }

  function updateSet(timeset){
    const newTimes = [...times]
    newTimes[activeTimer] = timeset
    setTimes(newTimes)
  }

  function removeSet(){
    if (confirm("are you sure you want to remove this set?")){
      const newTimes = times.filter((element , index) => {
        return index !== activeTimer
      })
      setTimes(newTimes)
      // fix out of bound Active Timer problem:
      if (activeTimer > newTimes.length - 1) {
        setactiveTimer(activeTimer - 1)
      }
    }
  }

  function reset() {
    if (confirm("are you sure to reset data to initial values? all additional data will be lost.")) {
      localStorage.removeItem("ontime-data")
      setTimes(UUT_SCHEDULE);
      setactiveTimer(0);
    }
  }

  function showEditSet(){
    setEditWindow(true);
  }


  function remainingTime() {
    const today = new Date() ;
    const hour = today.getHours() ;
    const min = today.getMinutes() ;
    const second = today.getSeconds() ;
    const [target , index] = closestTime(hour , min) ;
    if (target == -1) {
        return [-1 , -1] ;
    }
    else {
        const [targetHour , targetMin] = target.split(":") ;
        const remainingTime = ((targetHour * 60) + parseInt(targetMin) - (hour * 60) - parseInt(min)) * 60 - second;
        return [remainingTime , index ];
    }
}

function closestTime(hour , min){
    const timeList = times[activeTimer].times ;
    const total = (hour * 60) + parseInt(min) ;
    for (let i = 0 ; i < timeList.length ; i ++) {
        const [targetHour , targetMin] = timeList[i].split(":") ;
        const target = (targetHour * 60) + parseInt(targetMin) ;
        if (total < target) {
            return [timeList[i] , i]
        }
        else if (total == target && i < timeList.length-1) {
            return [timeList[i+1] , i + 1]
        }
        else if (i == timeList.length && total < target) {
            return [timeList[i] , i]
        }
    }
    return [-1 , -1] ;
}
// fetch data from local storage on first render
useMemo(() => {
  const data = JSON.parse(localStorage.getItem("ontime-data"))
  if (data) {
    setTimes(data)
  }
  else {
    setTimes(UUT_SCHEDULE)
  }
} , [])

// if times has changed , save it to local storage
useEffect(() => {
  localStorage.setItem("ontime-data" , JSON.stringify(times));
  // in case if color is modified , apply it
  document.documentElement.style.setProperty('--primary',times[activeTimer].color);
} , [times])

// if active tier is changed , reset timer and recalculate based on times
useEffect(() => {
  setRemaining(remainingTime())
  // set primary color:
  document.documentElement.style.setProperty('--primary',times[activeTimer].color);
  const timer = setInterval(() => {
    setRemaining(remainingTime())
  }, 1000);

  return () => {
    clearInterval(timer)
  }
}, [activeTimer])


  let modal = "";
  if (addSetWindow) {
    modal = <AddSet close={closeModal} addNewSet={addNewSet} mode="add"/>
  }
  else if (editWindow) {
    modal = <AddSet close={closeModal} updateSet={updateSet} updating={times[activeTimer]} mode ="update" />
  }
  return (
    <div>
      <div className="header">
      <h1>[On-Time]</h1>
      <p>Never miss any bus again!</p>
      </div>
      <button onClick={prevTimer} disabled={activeTimer == 0}>previous</button>
      <button onClick={nextTimer} disabled={activeTimer + 1 == times.length}>next</button>
      <button onClick={showEditSet}>edit set</button>
      <button onClick={removeSet} disabled = {times.length <= 1}>remove set</button>
      <button onClick={showAddSet}>add new set</button>
      <button onClick={reset}>reset</button>
      <Timer timer = {times[activeTimer]} remaining = {remaining[0]} timeIndex = {remaining[1]}/>
      <div className="footer">
      <p>Coded by Mohsen Farajollahi, <a href="https://github.com/mohsenfaraj/on-time" target="_blank">star on github</a></p>
      </div>
      {modal}
    </div>
  )
}

export default App
