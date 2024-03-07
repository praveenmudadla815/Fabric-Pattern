import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

const Canvas = ({
  brushSize,
  brushColor,
  selectedShape,
  textMode,
  fontSize,
}) => {
  const canvasRef = useRef(null);
  const isMouseDown = useRef(false);
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 1000,
      height: 600,
      backgroundColor: "#ffffff",
    });

    const setBrushProperties = () => {
      canvas.isDrawingMode = selectedShape === "free";
      canvas.freeDrawingBrush.width = brushSize;
      canvas.freeDrawingBrush.color = brushColor;
    };

    const handleMouseDown = (options) => {
      if (isMouseDown.current) {
        return;
      }
      isMouseDown.current = true;
      const { x, y } = options.pointer;

      switch (selectedShape) {
        case "line":
          canvas.selection = false;
          const line = new fabric.Line([x, y, x, y], {
            strokeWidth: brushSize,
            stroke: brushColor,
          });
          canvas.add(line);
          canvas.selection = true;
          break;
        case "rectangle":
          canvas.selection = false;
          const rect = new fabric.Rect({
            left: x,
            top: y,
            width: brushSize * 5,
            height: brushSize * 5,
            fill: brushColor,
          });
          canvas.add(rect);
          canvas.selection = true;
          break;
        case "circle":
          canvas.selection = false;
          const circle = new fabric.Circle({
            left: x,
            top: y,
            radius: brushSize * 6.5,
            fill: brushColor,
          });
          canvas.add(circle);
          canvas.selection = true;
          break;
        case "eraser":
          canvas.isDrawingMode = true;
          canvas.freeDrawingBrush.color = "#ffffff";
          canvas.freeDrawingBrush.width = brushSize;
          break;
        default:
          setBrushProperties();
          break;
      }
      handleTextMode(options, canvas);
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
      if (selectedShape === "eraser") {
        setBrushProperties();
      }
    };
    const handleTextMode = (options) => {
      const target = canvas.findTarget(options.e);
      if (textMode) {
        const { x, y } = options.pointer;
        if (target && target.type === "i-text") {
          target.enterEditing();
          target.setCoords();
          target.set("fontSize", fontSize);
        } else {
          const text = new fabric.IText("Type here", {
            left: x,
            top: y,
            fontSize: fontSize,
            fill: brushColor,
          });
          canvas.add(text);
          canvas.isDrawingMode = false;
          text.set({ editing: true });
          canvas.renderAll();
        }
      } else {
        canvas.isDrawingMode = selectedShape === "free";
        canvas.selection = true;
      }
    };

    canvas.on("mouse:down", handleMouseDown);
    canvas.on("mouse:up", handleMouseUp);

    return () => {
      canvas.dispose();
    };
  }, [brushSize, brushColor, selectedShape, textMode, fontSize]);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
