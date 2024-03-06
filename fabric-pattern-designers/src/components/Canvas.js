import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

const Canvas = ({ brushSize, brushColor }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = brushSize;
    canvas.freeDrawingBrush.color = brushColor;

    return () => {
      canvas.dispose();
    };
  }, [brushSize, brushColor]);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
