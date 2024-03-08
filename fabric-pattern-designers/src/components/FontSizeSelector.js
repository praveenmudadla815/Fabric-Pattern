import React from "react";

const FontSizeSelector = ({ fontSize, handleFontSizeChange, textMode }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label style={{ fontSize: "16px", fontWeight: "600", color: "#ffff" }}>
        Font Size:
      </label>
      <input
        style={{ marginTop: "6px" }}
        type="range"
        min="8"
        max="40"
        value={fontSize}
        onChange={handleFontSizeChange}
        disabled={!textMode}
      />
      <span>{fontSize}</span>
    </div>
  );
};

export default FontSizeSelector;
