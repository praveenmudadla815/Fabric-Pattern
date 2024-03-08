import React from "react";

const ColorPicker = ({ brushColor, handleBrushColorChange }) => {
  return (
    <div>
      <label style={{ fontSize: "16px", fontWeight: "600", color: "#ffff" }}>
        Brush Color:
      </label>
      <input
        type="color"
        value={brushColor}
        onChange={(e) => handleBrushColorChange(e.target.value)}
      />
    </div>
  );
};

export default ColorPicker;
