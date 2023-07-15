import { useState, useEffect, useMemo, useRef } from "react";
import tinycolor from "tinycolor2";
import Timer from "./timer";
import "./style.css";
import SelectLocation from "./SelectLocation";

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
  const autoupdate = useRef(true);

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

  async function getTimes() {
    const answer = await fetch(repos[0]);
    const jsonobj = await answer.json();
    return jsonobj;
  }

  useMemo(async () => {
    const times2 = await getTimes();
    setTimes(times2.times);
    setactiveTimer(0);
  }, []);

  useEffect(() => {
    if (times.length == 0) return;
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
    if (autoupdate.current) {
      setDestiny(destinies[0]);
    }
    autoupdate.current = true;
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
          <SelectLocation
            setDestiny={setDestiny}
            setorigin={setorigin}
            origin={origin}
            origins={origins}
            destiny={destiny}
            destinies={destinies}
            autoupdate={autoupdate}
          />
        </div>
        <div className="container">
          <Timer timer={times[activeTimer]} current={currentTime} />
        </div>
      </div>
    );
  } else return "Loading...";
}

export default App;
