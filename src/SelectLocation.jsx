import React from "react";

export default function SelectLocation({
  setDestiny,
  setorigin,
  origin,
  destiny,
  origins,
  destinies,
  autoupdate,
}) {
  function reverse() {
    autoupdate.current = false;
    const newDestiny = origin;
    setorigin(destiny);
    setDestiny(newDestiny);
  }

  function handleOriginChange(e) {
    setorigin(e.target.value);
  }

  function handleDestinyChange(e) {
    setDestiny(e.target.value);
  }

  return (
    <div className="locations">
      <div className="line">
        <div className="dot gray"></div>
        <div className="dashed"></div>
        <div className="dot blue"></div>
      </div>
      <div className="select">
        <label htmlFor="origin">From</label>
        <select
          name="origin"
          id="origin"
          onChange={handleOriginChange}
          value={origin}
        >
          {origins.map((item) => {
            return (
              <option value={item} key={item + "destiny"}>
                {item}
              </option>
            );
          })}
        </select>
        <hr />
        <label htmlFor="destiny">To</label>
        <select
          name="destiny"
          id="destiny"
          onChange={handleDestinyChange}
          value={destiny}
        >
          {destinies.map((item) => {
            return (
              <option value={item} key={"origin" + item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div className="alt" onClick={reverse}>
        <button>
          <i className="fas fa-exchange-alt fa-rotate-270"></i>
        </button>
      </div>
    </div>
  );
}
