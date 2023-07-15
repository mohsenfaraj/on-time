import React from "react";

export default function Repo({ link, remove, disabled }) {
  return (
    <div className="repo">
      <label>UUT</label>
      <input type="text" value={link} />
      <button>
        <i className="fas fa-share"></i>
      </button>
      <button
        className="red"
        disabled={disabled}
        onClick={() => {
          remove(link);
        }}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}
