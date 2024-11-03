import Repo from "./Repo";

type props = {
  repos: string[];
  setRepos: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Settings({ repos, setRepos }: props) {
  function remove(link: string) {
    const newRepos = repos.filter((item) => {
      return item !== link;
    });
    setRepos(newRepos);
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
                link={item}
                remove={remove}
                disabled={repos.length == 1}
                name={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
