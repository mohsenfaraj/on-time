// TODO: Check file format before adding to the repos
import React, { useEffect } from "react";
import { repoType } from "./xlsxLoader";
import { useNavigate, useLocation } from "react-router-dom";
import { base } from "./vars";

type Props = {
  repos: repoType[];
  setRepos: React.Dispatch<React.SetStateAction<repoType[]>>;
};

const AddRepo = ({ repos, setRepos }: Props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const link = queryParams.get("link");
  const overwrite = queryParams.get("rm") == "true";
  const navigate = useNavigate();

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
      navigate(base + "settings");
    }
  }
  return (
    <div className="max-w-screen-md mx-auto">
      <h1 className="text-2xl text-primary border-b border-primary font-bold">
        افزودن برنامه جدید
      </h1>
      <div className="rtl text-justify mt-5">
        <p>
          <strong className="font-bold text-red-600">توجه!</strong> این صفحه
          برای اضافه کردن برنامه سرویس جدید است.
        </p>
        <p>
          در صورتیکه با لینک به این صفحه آمدید و این لینک توسط فرد یا گروه معتبر
          بوده بر روی دکمه ثبت کلیک کنید. در غیر این صورت از کلیک بر روی دکمه
          ثبت اکیدا خودداری کنید!
        </p>
        <p>
          همچنین تیک زدن گزینه «حذف برنامه‌های قبلی» باعث{" "}
          <strong className="text-red-600">حذف شدن برنامه‌های قبلی </strong> شده
          و برنامه جدید رونویسی خواهد شد.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-10">
        <div className="flex justify-center gap-5 items-center">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="نام برنامه"
            defaultValue={name || ""}
            required
            className="flex-grow p-3 border border-zinc-500 rounded"
          />
          <label htmlFor="name">نام برنامه</label>
        </div>
        <div className="flex justify-center gap-5 items-center">
          <input
            type="url"
            name="link"
            id="link"
            placeholder="لینک فایل اکسل"
            defaultValue={link || ""}
            required
            className="flex-grow p-3 border border-zinc-500 rounded"
          />
          <label htmlFor="name">لینک فایل</label>
        </div>
        <div className="flex justify-center mb-4 rtl">
          <input
            id="overwrite"
            type="checkbox"
            name="overwrite"
            defaultChecked={overwrite || false}
            className="w-5 h-5"
          />
          <label htmlFor="overwrite" className="ms-2 text-gray-900">
            حذف برنامه‌های قبلی
          </label>
        </div>

        <input type="submit" value="ثبت" className="glass-button selected" />
      </form>
    </div>
  );
};

export default AddRepo;
