import React from "react";

const BrushSettings = ({ brushSize, handleBrushSizeChange }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label style={{ fontSize: "16px", fontWeight: "600", color: "#ffff" }}>
        Brush Size:
      </label>
      <input
        style={{ marginTop: "6px" }}
        type="range"
        min="1"
        max="20"
        value={brushSize}
        onChange={handleBrushSizeChange}
      />
      <span>{brushSize}</span>
    </div>
  );
};

export default BrushSettings;
