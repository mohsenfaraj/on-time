import Repo from "./Repo";

export default function Settings({ repos, setrepos }) {
  function remove(link) {
    const newRepos = repos.filter((item) => {
      return item !== link;
    });
    setrepos(newRepos);
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
