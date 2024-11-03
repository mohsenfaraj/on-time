import React from "react";
import { useMemo } from "react";
export default function SelectLocation({ times, activeTimer, setactiveTimer }) {
  const titles = useMemo(() => {
    return times.map((item) => {
      return item.origin;
    });
  }, [times]);

  function handleLocationSwitch(index) {
    setactiveTimer(index);
  }

  return (
    <div className="locations">
      <h2>مبدا خود را انتخاب کنید:</h2>
      <div className="location-selector">
        {titles.map((title, index) => {
          return (
            <button
              onClick={() => handleLocationSwitch(index)}
              className={index == activeTimer ? "selected" : ""}
            >
              {title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
