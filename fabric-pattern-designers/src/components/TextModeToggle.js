import React from "react";

const TextModeToggle = ({ textMode, handleTextModeToggle }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label style={{ fontSize: "16px", fontWeight: "600", color: "#ffff" }}>
        Text Mode:
      </label>
      <input
        style={{ marginTop: "6px" }}
        type="checkbox"
        checked={textMode}
        onChange={handleTextModeToggle}
      />
    </div>
  );
};

export default TextModeToggle;
