import { useState, useEffect, useMemo, useRef, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import tinycolor from "tinycolor2";
import Timer from "./timer";
import "./style.css";
import SelectLocation from "./SelectLocation";
import Settings from "./Settings";
const TIMES_LINK = ["./UUTBusTimes.json", "./test.json"];
function App() {
  const timer = useRef();
  const [times, setTimes] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTimer, setactiveTimer] = useState();
  const [repos, setrepos] = useState(TIMES_LINK);
  const [repoNames, setRepoNames] = useState([]);
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
    let downloadedTimes = [];
    let names = [];
    for (let i = 0; i < repos.length; i++) {
      const answer = await fetch(repos[i]);
      const jsonobj = await answer.json();
      names.push(jsonobj.name);
      downloadedTimes.push(jsonobj);
    }
    setRepoNames(names);
    return downloadedTimes;
  }

  useLayoutEffect(() => {
    (async () => {
      // clear destiny and origin if reos has changed:
      setDestiny("");
      setorigin("");
      const times2 = await getTimes();
      let timeList = [];
      for (let i = 0; i < times2.length; i++) {
        timeList = [...timeList, ...times2[i].times];
      }
      setTimes(timeList);
      setactiveTimer(0);
    })();
  }, [repos]);

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

  // if active timer is changed , reset timer and recalculate based on times
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

  const css = `.header{min-height:100px;!important}`;
  if (times.length > 0) {
    return (
      <BrowserRouter>
        <div>
          <div className="header">
            <div className="apptitle">
              <div className="logo">
                <Link to={"/on-time/"}>
                  <i className="fas fa-bus fa-2x"></i>
                  <h1>[On-Time]</h1>
                </Link>
              </div>

              <div className="settingsbtn">
                <Link to={"/on-time/settings"}>
                  <i className="fas fa-cog fa-2x"></i>
                  <p>Settings</p>
                </Link>
              </div>
            </div>
            <Routes>
              <Route
                path="/on-time/"
                element={
                  <SelectLocation
                    setDestiny={setDestiny}
                    setorigin={setorigin}
                    origin={origin}
                    origins={origins}
                    destiny={destiny}
                    destinies={destinies}
                    autoupdate={autoupdate}
                  />
                }
              />
              <Route
                path="/on-time/settings"
                element={
                  <div className="settingsHead">
                    <style>{css}</style>
                  </div>
                }
              />
            </Routes>
          </div>
          <div className="container">
            <Routes>
              <Route
                path="/on-time"
                element={
                  <Timer timer={times[activeTimer]} current={currentTime} />
                }
              />
              <Route
                path="/on-time/settings"
                element={
                  <Settings
                    repos={repos}
                    setrepos={setrepos}
                    names={repoNames}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  } else return "Loading...";
}

export default App;
