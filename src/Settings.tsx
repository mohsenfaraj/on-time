import { Link } from "react-router-dom";
import Repo from "./Repo";
import { repoType } from "./xlsxLoader";
import { defaultRepo } from "./App";
import { base } from "./Vars";

type props = {
  repos: repoType[];
  setRepos: React.Dispatch<React.SetStateAction<repoType[]>>;
};

export default function Settings({ repos, setRepos }: props) {
  function remove(link: string) {
    const newRepos = repos.filter((item) => {
      return item.link !== link;
    });
    setRepos(newRepos);
  }

  function resetProgram() {
    setRepos(defaultRepo);
  }

  return (
    <div className="settings">
      <h1>تنظیمات</h1>
      <div>
        <h2>برنامه‌های زمانی فعال:</h2>
        <div className="repos">
          {repos.map((item, index) => {
            return (
              <Repo
                link={item.link}
                remove={remove}
                disabled={repos.length == 1}
                name={item.name}
                key={item.link}
              />
            );
          })}
          <div>
            <Link to={base + "add"} className="glass-button selected">
              افزودن برنامه جدید
            </Link>
            <button className="glass-button selected" onClick={resetProgram}>
              بازنشانی برنامه به پیشفرض
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
