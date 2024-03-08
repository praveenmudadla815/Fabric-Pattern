import React from "react";

const ShapeSelector = ({ selectedShape, handleShapeChange }) => {
  return (
    <div>
      <label style={{ fontSize: "16px", fontWeight: "600", color: "#ffff" }}>
        Shape:
      </label>
      <select
        value={selectedShape}
        onChange={(e) => handleShapeChange(e.target.value)}
      >
        <option value="free">Free Drawing</option>
        <option value="rectangle">Rectangle</option>
        <option value="circle">Circle</option>
        <option value="eraser">Eraser</option>
      </select>
    </div>
  );
};

export default ShapeSelector;
