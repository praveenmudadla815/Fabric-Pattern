import React, { useState } from "react";
import Canvas from "./Canvas";

const PatternDesigner = () => {
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState("#000000");
  const [selectedShape, setSelectedShape] = useState("free");
  const [textMode, setTextMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const handleBrushSizeChange = (e) => {
    setBrushSize(parseInt(e.target.value, 10));
  };

  const handleBrushColorChange = (color) => {
    setBrushColor(color);
  };

  const handleShapeChange = (shape) => {
    setSelectedShape(shape);
    setTextMode(false);
  };
  const handleTextModeToggle = () => {
    setTextMode(!textMode);
    // Disable other drawing modes when entering text mode
    setSelectedShape("");
  };
  const handleFontSizeChange = (e) => {
    setFontSize(parseInt(e.target.value, 10));
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
      <div>
        <label>Shape:</label>
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
      <div>
        <label>Text Mode:</label>
        <input
          type="checkbox"
          checked={textMode}
          onChange={handleTextModeToggle}
        />
      </div>

      <div>
        <label>Font Size:</label>
        <input
          type="range"
          min="8"
          max="40"
          value={fontSize}
          onChange={handleFontSizeChange}
          disabled={!textMode}
        />
        <span>{fontSize}</span>
      </div>

      <Canvas
        brushSize={brushSize}
        brushColor={brushColor}
        selectedShape={selectedShape}
        textMode={textMode}
        fontSize={fontSize}
      />
    </div>
  );
};

export default PatternDesigner;
