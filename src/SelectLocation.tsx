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
    <div className="locations">
      <h2>مبدا خود را انتخاب کنید:</h2>
      <div className="location-selector">
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
