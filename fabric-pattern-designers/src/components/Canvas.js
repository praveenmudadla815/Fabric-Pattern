import React, { useEffect, useRef, useState } from "react";
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
  const [undo, setUndo] = useState([]);
  const [redo, setRedo] = useState([]);
  const canvas = useRef(null);

  useEffect(() => {
    canvas.current = new fabric.Canvas(canvasRef.current, {
      width: 1000,
      height: 500,
      backgroundColor: "#ffffff",
    });

    const setBrushProperties = () => {
      canvas.current.isDrawingMode = selectedShape === "free";
      canvas.current.freeDrawingBrush.width = brushSize;
      canvas.current.freeDrawingBrush.color = brushColor;
    };
    console.log(undo, "undoooooo");
    const saveCanvasState = () => {
      const json = JSON.stringify(canvas.current.toJSON());
      debugger;
      setUndo((prev) => [...prev, json]);
      setRedo([]);
    };

    const handleMouseDown = (options) => {
      if (isMouseDown.current) {
        return;
      }
      isMouseDown.current = true;
      saveCanvasState();
      const { x, y } = options.pointer;

      switch (selectedShape) {
        case "line":
          canvas.current.selection = false;
          const line = new fabric.Line([x, y, x, y], {
            strokeWidth: brushSize,
            stroke: brushColor,
          });
          canvas.current.add(line);
          canvas.current.selection = true;
          break;
        case "rectangle":
          canvas.current.selection = false;
          const rect = new fabric.Rect({
            left: x,
            top: y,
            width: brushSize * 5,
            height: brushSize * 5,
            fill: brushColor,
          });
          canvas.current.add(rect);
          canvas.current.selection = true;
          break;
        case "circle":
          canvas.current.selection = false;
          const circle = new fabric.Circle({
            left: x,
            top: y,
            radius: brushSize * 6.5,
            fill: brushColor,
          });
          canvas.current.add(circle);
          canvas.current.selection = true;
          break;
        case "eraser":
          canvas.current.isDrawingMode = true;
          canvas.current.freeDrawingBrush.color = "#ffffff";
          canvas.current.freeDrawingBrush.width = brushSize;
          break;
        default:
          setBrushProperties();
          break;
      }
      handleTextMode(options, canvas.current);
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
      if (selectedShape === "eraser") {
        setBrushProperties();
      }
    };

    const handleTextMode = (options) => {
      const target = canvas.current.findTarget(options.e);
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
          canvas.current.add(text);
          canvas.current.isDrawingMode = false;
          text.set({ editing: true });
          canvas.current.renderAll();
        }
      } else {
        canvas.current.isDrawingMode = selectedShape === "free";
        canvas.current.selection = true;
      }
    };

    canvas.current.on("mouse:down", handleMouseDown);
    canvas.current.on("mouse:up", handleMouseUp);

    return () => {
      canvas.current.dispose();
    };
  }, [brushSize, brushColor, selectedShape, textMode, fontSize]);

  const handleUndo = () => {
    if (undo.length > 1 && typeof undo[0] === "string") {
      const currentState = undo.slice(0, undo.length - 1);
      const lastState = undo[undo.length - 1];
      setRedo([lastState, ...redo]);
      setUndo(currentState);

      const parsedState = JSON.parse(currentState[currentState.length - 1]);
      canvas.current.loadFromJSON(parsedState, () => {
        canvas.current.renderAll();
      });
    } else if (undo.length > 1 && typeof undo[0] === "object") {
      const currentState = undo.slice(0, undo.length - 1);
      const lastState = undo[undo.length - 1];
      setRedo([lastState, ...redo]);
      setUndo(currentState);

      // Remove  added image
      const lastAddedImage = canvas.current.getObjects().pop();
      canvas.current.remove(lastAddedImage);
    }
  };

  const handleRedo = () => {
    if (redo.length > 0) {
      const nextState = redo[0];
      setUndo([...undo, nextState]);
      setRedo(redo.slice(1));

      const parsedState = JSON.parse(nextState);
      canvas.current.loadFromJSON(parsedState, () => {
        canvas.current.renderAll();
      });
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUndo((prev) => [...prev, file]);
      const reader = new FileReader();
      reader.onload = function (event) {
        const imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function () {
          const image = new fabric.Image(imgObj);
          canvas.current.add(image);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <input type="file" onChange={handleImageUpload} />
      </div>
      <div>
        <canvas
          ref={canvasRef}
          style={{ border: "2px solid red", width: "" }}
        />
        <div
          style={{
            display: "flex",
            marginTop: "20px",
            justifyContent: "space-evenly",
          }}
        >
          <button
            onClick={handleUndo}
            disabled={undo.length === 0}
            style={{
              width: "100px",
              padding: "6px",
              fontSize: "16px",

              border: "none",
            }}
          >
            Undo
          </button>
          <button
            onClick={handleRedo}
            disabled={redo.length === 0}
            style={{
              width: "100px",
              padding: "6px",
              fontSize: "16px",

              border: "none",
            }}
          >
            Redo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
