import React, { useState } from "react";
import BrushSettings from "./BrushSettings";
import ColorPicker from "./ColorPicker";
import ShapeSelector from "./ShapeSelector";
import TextModeToggle from "./TextModeToggle";
import FontSizeSelector from "./FontSizeSelector";
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
    setSelectedShape("");
  };

  const handleFontSizeChange = (e) => {
    setFontSize(parseInt(e.target.value, 10));
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Fabric Pattern Designer</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginBlock: "20px",
          border: "2px solid blue",
          width: "1000px",
          backgroundColor: "blue",
        }}
      >
        <BrushSettings
          brushSize={brushSize}
          handleBrushSizeChange={handleBrushSizeChange}
        />
        <ColorPicker
          brushColor={brushColor}
          handleBrushColorChange={handleBrushColorChange}
        />
        <ShapeSelector
          selectedShape={selectedShape}
          handleShapeChange={handleShapeChange}
        />
        <TextModeToggle
          textMode={textMode}
          handleTextModeToggle={handleTextModeToggle}
        />
        <FontSizeSelector
          fontSize={fontSize}
          handleFontSizeChange={handleFontSizeChange}
          textMode={textMode}
        />
      </div>

      <div>
        <Canvas
          brushSize={brushSize}
          brushColor={brushColor}
          selectedShape={selectedShape}
          textMode={textMode}
          fontSize={fontSize}
        />
      </div>
    </div>
  );
};

export default PatternDesigner;
