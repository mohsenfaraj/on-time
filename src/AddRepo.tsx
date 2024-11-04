// TODO: Check file format before adding to the repos
import React, { useEffect } from "react";
import { repoType } from "./xlsxLoader";
import { useLocation } from "react-router-dom";

type Props = {
  repos: repoType[];
  setRepos: React.Dispatch<React.SetStateAction<repoType[]>>;
};

const AddRepo = ({ repos, setRepos }: Props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const link = queryParams.get("link");
  const overwrite = queryParams.get("rm");

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const newRepo = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      link: (form.elements.namedItem("link") as HTMLInputElement).value,
      overwrite: (form.elements.namedItem("overwrite") as HTMLInputElement)
        .checked,
    };
    if (repos.findIndex((item) => item.link == newRepo.link) != -1) {
      alert("این برنامه از قبل اضافه شده است!");
    } else {
      if (newRepo.overwrite) {
        setRepos((oldRepo) => {
          return [{ name: newRepo.name, link: newRepo.link }];
        });
      } else {
        setRepos((oldRepo) => {
          return [...oldRepo, { name: newRepo.name, link: newRepo.link }];
        });
      }
      alert(`برنامه ${newRepo.name} با موفقیت اضافه شد!`);
    }
  }
  return (
    <div className="addrepo">
      <h1>افزودن برنامه جدید</h1>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="نام برنامه"
            defaultValue={name || ""}
          />
          <label htmlFor="name">نام برنامه</label>
        </div>
        <div>
          <input
            type="url"
            name="link"
            id="link"
            placeholder="لینک فایل اکسل"
            defaultValue={link || ""}
          />
          <label htmlFor="name">لینک فایل</label>
        </div>

        <div>
          <input
            type="checkbox"
            name="overwrite"
            id="overwrite"
            defaultChecked={overwrite == "true"}
          />
          <label htmlFor="overwrite">حذف برنامه‌های قبلی</label>
        </div>

        <div>
          <p>
            <strong>توجه!</strong> این صفحه برای اضافه کردن برنامه سرویس جدید
            است.
          </p>
          <p>
            در صورتیکه با لینک به این صفحه آمدید و این لینک توسط فرد یا گروه
            معتبر بوده بر روی دکمه ثبت کلیک کنید. در غیر این صورت از کلیک بر روی
            دکمه ثبت اکیدا خودداری کنید!
          </p>
          <p>
            همچنین تیک زدن گزینه «حذف برنامه‌های قبلی» باعث حذف شدن برنامه‌های
            قبلی شده و برنامه جدید رونویسی خواهد شد.
          </p>
        </div>

        <input type="submit" value="ثبت" className="glass-button selected" />
      </form>
    </div>
  );
};

export default AddRepo;
