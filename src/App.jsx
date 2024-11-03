import { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Timer from "./timer";
import tinycolor from "tinycolor2";
import "./style.css";
import Settings from "./Settings";
import { useEffect } from "react";
import SelectLocation from "./SelectLocation";
import { loadTimes } from "./xlsxloader";
const TIMES_LINK = ["./UUT-BUS.xlsx"];
function App() {
  const [times, setTimes] = useState([]);
  const [activeTimer, setactiveTimer] = useState(0);
  const [repos, setrepos] = useState(TIMES_LINK);

  const hue = useMemo(() => {
    if (times.length > 0) return Math.round((activeTimer / times.length) * 100);
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
              --primary: ${tinycolor(`hsl(${hue}%, 100%, 40%)`)} ;
              --secondary: ${tinycolor(`hsl(${hue}%, 100%, 30%)`)} ;
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
                    setactiveTimer={setactiveTimer}
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
                element={<Settings repos={repos} setrepos={setrepos} />}
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
