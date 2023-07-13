import { useState, useEffect, useMemo, useRef } from "react";
import Timer from "./timer";
import AddSet from "./addSet";
import "./style.css";
function App() {
  const timer = useRef();
  const [times, setTimes] = useState([]);
  const [activeTimer, setactiveTimer] = useState();
  const [addSetWindow, setAddSetWindow] = useState(false);
  const [editWindow, setEditWindow] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [repos, setrepos] = useState(["UUTBusTimes.json"]);

  async function getTimes() {
    const answer = await fetch(repos[0]);
    const jsonobj = await answer.json();
    return jsonobj;
  }

  function addNewSet(timeset) {
    const newTimes = [...times];
    newTimes.push(timeset);
    setTimes(newTimes);
  }

  function updateSet(timeset) {
    const newTimes = [...times];
    newTimes[activeTimer] = timeset;
    setTimes(newTimes);
  }

  function removeSet() {
    if (confirm("are you sure you want to remove this set?")) {
      const newTimes = times.filter((element, index) => {
        return index !== activeTimer;
      });
      setTimes(newTimes);
      // fix out of bound Active Timer problem:
      if (activeTimer > newTimes.length - 1) {
        setactiveTimer(activeTimer - 1);
      }
    }
  }

  function reset() {
    if (
      confirm(
        "are you sure to reset data to initial values? all additional data will be lost."
      )
    ) {
      localStorage.removeItem("ontime-data");
      setTimes(UUT_SCHEDULE);
      setactiveTimer(0);
    }
  }

  function remainingTime() {
    const today = new Date();
    const hour = today.getHours();
    const min = today.getMinutes();
    const second = today.getSeconds();
    const [target, index] = closestTime(hour, min);
    if (target == -1) {
      return [-1, -1];
    } else {
      const [targetHour, targetMin] = target.split(":");
      const remainingTime =
        (targetHour * 60 + parseInt(targetMin) - hour * 60 - parseInt(min)) *
          60 -
        second;
      return [remainingTime, index];
    }
  }

  function closestTime(hour, min) {
    const timeList = times[activeTimer].times;
    const total = hour * 60 + parseInt(min);
    for (let i = 0; i < timeList.length; i++) {
      const [targetHour, targetMin] = timeList[i].split(":");
      const target = targetHour * 60 + parseInt(targetMin);
      if (total < target) {
        return [timeList[i], i];
      } else if (total == target && i < timeList.length - 1) {
        return [timeList[i + 1], i + 1];
      } else if (i == timeList.length && total < target) {
        return [timeList[i], i];
      }
    }
    return [-1, -1];
  }
  // fetch data from local storage on first render
  useMemo(async () => {
    const data = JSON.parse(localStorage.getItem("ontime-data"));
    if (data && data.length > 0) {
      setTimes(data);
      setactiveTimer(0);
    } else {
      const times2 = await getTimes();
      setTimes(times2.times);
      setactiveTimer(0);
    }
  }, []);

  // if times has changed , save it to local storage
  useEffect(() => {
    if (times.length == 0) return;
    localStorage.setItem("ontime-data", JSON.stringify(times));
    // in case if color is modified , apply it
    document.documentElement.style.setProperty(
      "--primary",
      times[activeTimer].color
    );
  }, [times]);

  // if active tier is changed , reset timer and recalculate based on times
  useEffect(() => {
    if (times.length == 0) return;
    setRemaining(remainingTime());
    // set primary color:
    document.documentElement.style.setProperty(
      "--primary",
      times[activeTimer].color
    );
    timer.current = setInterval(() => {
      setRemaining(remainingTime());
    }, 1000);

    return () => {
      clearInterval(timer.current);
    };
  }, [activeTimer]);

  let modal = "";
  if (addSetWindow) {
    modal = <AddSet close={closeModal} addNewSet={addNewSet} mode="add" />;
  } else if (editWindow) {
    modal = (
      <AddSet
        close={closeModal}
        updateSet={updateSet}
        updating={times[activeTimer]}
        mode="update"
      />
    );
  }

  if (times.length > 0) {
    return (
      <div>
        <div className="header">
          <div className="apptitle">
            <i className="fas fa-bus fa-2x"></i>
            <h1>[On-Time]</h1>
          </div>
          <div className="locations">
            <div className="line">
              <div className="dot blue"></div>
              <div className="dashed"></div>
              <div className="dot green"></div>
            </div>
            <div className="select">
              <label htmlFor="origin">From</label>
              <select name="origin" id="origin">
                <option value="Daneshkade">Daneshkadeh</option>
                <option value="Isar">Isar</option>
                <option value="Daneshgah">Daneshgah</option>
              </select>
              <hr />
              <label htmlFor="destiny">To</label>
              <select name="destiny" id="destiny">
                <option value="Daneshkade">Daneshkadeh</option>
                <option value="Isar">Isar</option>
                <option value="Daneshgah">Daneshgah</option>
              </select>
            </div>
            <div className="alt">
              <i className="fas fa-exchange-alt fa-rotate-270"></i>
            </div>
          </div>
        </div>
        <div className="container">
          <Timer
            timer={times[activeTimer]}
            remaining={remaining[0]}
            timeIndex={remaining[1]}
          />
          {modal}
        </div>
      </div>
    );
  } else return "Loading...";
}

export default App;
