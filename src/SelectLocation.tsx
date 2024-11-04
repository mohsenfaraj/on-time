import React, { useMemo } from "react";
import { scheduleType } from "./xlsxLoader";
type props = {
  times: scheduleType[];
  activeTimer: number;
  setActiveTimer: React.Dispatch<React.SetStateAction<number>>;
};
export default function SelectLocation({
  times,
  activeTimer,
  setActiveTimer,
}: props) {
  const titles = useMemo(() => {
    return times.map((item) => {
      return item.origin;
    });
  }, [times]);

  function handleLocationSwitch(index: number) {
    setActiveTimer(index);
  }

  return (
    <div className="max-w-screen-sm w-full rtl flex flex-col justify-around gap-4 items-center bg-white rounded-xl mx-auto mt-5 z-10 p-5">
      <h2 className="text-zinc-600 font-semibold">مبدا خود را انتخاب کنید:</h2>
      <div className="grid grid-cols-2 gap-3">
        {times.length == 0 && (
          <p style={{ gridColumn: "1 / span 2" }}> برنامه‌ای تعریف نشده است</p>
        )}
        {titles.map((title, index) => {
          return (
            <button
              onClick={() => handleLocationSwitch(index)}
              className={
                index == activeTimer ? "glass-button selected" : "glass-button"
              }
              key={title + index}
            >
              {title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
