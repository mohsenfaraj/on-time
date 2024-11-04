// TODO: better error handling and loading management
import { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Timer from "./Timer";
import "./style.css";
import Settings from "./Settings";
import { useEffect } from "react";
import SelectLocation from "./SelectLocation";
import { loadTimes, repoType, scheduleType } from "./xlsxLoader";
import AddRepo from "./AddRepo";
import { base } from "./Vars";
export const defaultRepo = [
  {
    name: "دانشگاه صنعتی ارومیه",
    link: "./UUT-BUS.xlsx",
  },
];
function App() {
  const [times, setTimes] = useState<scheduleType[]>([]);
  const [activeTimer, setactiveTimer] = useState(0);
  const [repos, setrepos] = useState((): repoType[] => {
    let data = localStorage.getItem("repos");
    if (data) {
      return JSON.parse(data);
    }
    return defaultRepo;
  });
  const hue = useMemo(() => {
    if (times.length > 0) return Math.round((activeTimer / times.length) * 360);
    else return 0;
  }, [activeTimer]);

  useEffect(() => {
    async function load() {
      const data = await loadTimes(repos);
      setTimes(data);
    }
    localStorage.setItem("repos", JSON.stringify(repos));
    load();
  }, [repos]);

  const css = `.header{min-height:100px;!important}`;
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
              <Link to={base}>
                <i className="fas fa-bus fa-2x"></i>
                <h1>[On-Time]</h1>
              </Link>
            </div>

            <div className="settingsbtn">
              <Link to={base + "settings"}>
                <i className="fas fa-cog fa-2x"></i>
                <p>تنظیمات</p>
              </Link>
            </div>
          </div>
          <Routes>
            <Route
              path={base}
              element={
                <SelectLocation
                  times={times}
                  activeTimer={activeTimer}
                  setActiveTimer={setactiveTimer}
                />
              }
            />
            <Route
              path={base + "settings"}
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
              path={base}
              element={
                times && times.length > 0 ? (
                  <Timer timer={times[activeTimer]} />
                ) : (
                  <h2>برنامه‌ای برای نمایش وجود ندارد</h2>
                )
              }
            />
            <Route
              path={base + "settings"}
              element={<Settings repos={repos} setRepos={setrepos} />}
            />
            <Route
              path={base + "add"}
              element={<AddRepo repos={repos} setRepos={setrepos} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
