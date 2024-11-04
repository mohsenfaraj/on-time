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
import { base } from "./vars";
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
    setactiveTimer(0);
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
        <div className="header bg-gradient-to-b bg-primary flex flex-col min-h-96 py-5 px-8 pb-16 transition duration-200 ease-in relative">
          <div className="flex gap-5 items-center z-10 text-white">
            <div>
              <Link
                to={base}
                className="no-underline flex flex-col gap-3 items-center text-xs"
              >
                <i className="fas fa-bus fa-2x"></i>
                <h1>[On-Time]</h1>
              </Link>
            </div>

            <div className="ml-auto">
              <Link
                to={base + "settings"}
                className="flex justify-center items-center flex-col text-xs gap-2"
              >
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
                <div className="h-full relative text-white text-center">
                  <style>{css}</style>
                </div>
              }
            />
          </Routes>
        </div>
        <div className="min-h-80 text-center rounded-3xl bg-white -translate-y-7 p-8 pb-16">
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
              element={
                <>
                  {" "}
                  <style>{css}</style>
                  <AddRepo repos={repos} setRepos={setrepos} />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
