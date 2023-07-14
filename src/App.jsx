import { useState, useEffect, useMemo, useRef } from "react";
import tinycolor from "tinycolor2";
import Timer from "./timer";
import "./style.css";
let autoupdate = true;

function App() {
  const timer = useRef();
  const [times, setTimes] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTimer, setactiveTimer] = useState();
  const [repos, setrepos] = useState(["UUTBusTimes.json"]);
  const [origins, setorigins] = useState([]);
  const [origin, setorigin] = useState();
  const [destiny, setDestiny] = useState();
  const [destinies, setDestinies] = useState([]);

  function onlyUnique(array) {
    let withdp = array.map((item) => {
      return item.origin;
    });
    let withoutdp = withdp.filter((value, index, array) => {
      return array.indexOf(value) === index;
    });
    return withoutdp;
  }

  function getOrigins() {
    const options = onlyUnique(times);
    setorigins(options);
  }

  function getDestinies() {
    const destinies = times
      .filter((item) => {
        return item.origin == origin;
      })
      .map((item) => item.destiny);
    setDestinies(destinies);
  }

  function handleOriginChange(e) {
    setorigin(e.target.value);
  }

  function handleDestinyChange(e) {
    setDestiny(e.target.value);
  }

  function reverse() {
    autoupdate = false;
    const newDestiny = origin;
    setorigin(destiny);
    setDestiny(newDestiny);
  }

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
  // fetch data from local storage on first render
  useMemo(async () => {
    // const data = JSON.parse(localStorage.getItem("ontime-data"));
    // if (data && data.length > 0) {
    //   setTimes(data);
    //   setactiveTimer(0);
    // } else {
    const times2 = await getTimes();
    setTimes(times2.times);
    setactiveTimer(0);
    // }
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
    getOrigins();
  }, [times]);

  useEffect(() => {
    setorigin(origins[0]);
  }, [origins]);

  useEffect(() => {
    getDestinies();
  }, [origin]);

  useEffect(() => {
    if (autoupdate) {
      setDestiny(destinies[0]);
    }
    autoupdate = true;
  }, [destinies]);

  useEffect(() => {
    times.forEach((item, index) => {
      if (item.origin == origin && item.destiny == destiny) {
        setactiveTimer(index);
      }
    });
  }, [origin, destiny]);

  // if active tier is changed , reset timer and recalculate based on times
  useEffect(() => {
    if (times.length == 0) return;
    setCurrentTime(new Date());
    // set primary color:
    document.documentElement.style.setProperty(
      "--primary",
      times[activeTimer].color
    );
    // set secondary color :
    document.documentElement.style.setProperty(
      "--secondary",
      tinycolor(times[activeTimer].color).darken(20)
    );

    timer.current = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60);

    return () => {
      clearInterval(timer.current);
    };
  }, [activeTimer]);

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
              <div className="dot gray"></div>
              <div className="dashed"></div>
              <div className="dot blue"></div>
            </div>
            <div className="select">
              <label htmlFor="origin">From</label>
              <select
                name="origin"
                id="origin"
                onChange={handleOriginChange}
                value={origin}
              >
                {origins.map((item) => {
                  return (
                    <option value={item} key={item + "destiny"}>
                      {item}
                    </option>
                  );
                })}
              </select>
              <hr />
              <label htmlFor="destiny">To</label>
              <select
                name="destiny"
                id="destiny"
                onChange={handleDestinyChange}
                value={destiny}
              >
                {destinies.map((item) => {
                  return (
                    <option value={item} key={"origin" + item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="alt" onClick={reverse}>
              <button>
                <i className="fas fa-exchange-alt fa-rotate-270"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <Timer timer={times[activeTimer]} current={currentTime} />
        </div>
      </div>
    );
  } else return "Loading...";
}

export default App;
