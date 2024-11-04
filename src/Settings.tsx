import { Link } from "react-router-dom";
import Repo from "./Repo";
import { repoType } from "./xlsxLoader";
import { defaultRepo } from "./App";
import { base } from "./vars";

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
    <div className="flex flex-col gap-6 rtl max-w-screen-md mx-auto">
      <h1 className="text-2xl text-primary border-b border-primary font-bold">
        تنظیمات
      </h1>
      <div className="flex flex-col gap-5">
        <h2>برنامه‌های زمانی فعال:</h2>
        <div className="flex flex-col gap-3">
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
          <div className="mt-3 flex justify-center gap-4">
            <Link to={base + "add"} className="glass-button selected">
              افزودن برنامه جدید
            </Link>
            <button className="glass-button" onClick={resetProgram}>
              بازنشانی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
