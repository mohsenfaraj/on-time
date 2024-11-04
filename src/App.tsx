import { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Timer from "./Timer";
import "./style.css";
import Settings from "./Settings";
import { useEffect } from "react";
import SelectLocation from "./SelectLocation";
import { loadTimes, scheduleType } from "./xlsxLoader";
const TIMES_LINK = ["./UUT-BUS.xlsx"];
function App() {
  const [times, setTimes] = useState<scheduleType[]>([]);
  const [activeTimer, setactiveTimer] = useState(0);
  const [repos, setrepos] = useState(TIMES_LINK);

  const hue = useMemo(() => {
    if (times.length > 0) return Math.round((activeTimer / times.length) * 360);
    else return 0;
  }, [activeTimer]);

  useEffect(() => {
    async function load() {
      const data = await loadTimes(TIMES_LINK);
      setTimes(data);
    }
    load();
  }, [repos]);

  const css = `.header{min-height:100px;!important}`;
  if (times && times.length > 0) {
    return (
      <BrowserRouter>
        <div>
          <style>
            {`
              :root{
              --primary: ${`${hue}, 100%, 40%`} ;
              }
            `}
          </style>
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
                  <p>تنظیمات</p>
                </Link>
              </div>
            </div>
            <Routes>
              <Route
                path="/on-time/"
                element={
                  <SelectLocation
                    times={times}
                    activeTimer={activeTimer}
                    setActiveTimer={setactiveTimer}
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
                element={<Timer timer={times[activeTimer]} />}
              />
              <Route
                path="/on-time/settings"
                element={<Settings repos={repos} setRepos={setrepos} />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
    // TODO: create a loading page
  } else return "Loading...";
}

export default App;
