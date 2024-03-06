import React, { useState } from "react";
import Canvas from "./Canvas";

const PatternDesigner = () => {
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState("#000000");
  const [selectedShape, setSelectedShape] = useState("free");

  const handleBrushSizeChange = (e) => {
    setBrushSize(parseInt(e.target.value, 10));
  };

  const handleBrushColorChange = (color) => {
    setBrushColor(color.hex);
  };

  const handleShapeChange = (shape) => {
    setSelectedShape(shape);
  };

  return (
    <div>
      <h1>Fabric Pattern Designer</h1>
      <div>
        <label>Brush Size:</label>
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={handleBrushSizeChange}
        />
        <span>{brushSize}</span>
      </div>
      <div>
        <label>Brush Color:</label>
        <input
          type="color"
          value={brushColor}
          onChange={(e) => handleBrushColorChange(e.target.value)}
        />
      </div>

      <Canvas
        brushSize={brushSize}
        brushColor={brushColor}
        selectedShape={selectedShape}
      />
    </div>
  );
};

export default PatternDesigner;