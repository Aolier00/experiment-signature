import React, { useEffect, useMemo, useState } from "react";
import Draggable from "./components/Draggable";
import { DraggableInterface, dataDraggable } from "./domain/Dragg";
import Canvas from "./components/Canvas";
import useCanvas from "./hooks/useCanvas";

const DraggableCanvas: React.FC = () => {
  const [draggableData, setDraggableData] =
    useState<DraggableInterface[]>(dataDraggable);
  const { canvasData, setCanvasData } = useCanvas();
  useEffect(() => {}, [canvasData]);
  return (
    <section className="h-screen flex flex-row">
      <div id="auto-scroll" className="gap-2 w-10/12  h-screen overflow-auto">
        {canvasData.length
          ? canvasData.map((item, i) => (
              <Canvas
                canvasData={canvasData}
                index={i}
                setCanvasData={setCanvasData}
                key={i}
                base64={item.children}
              />
            ))
          : null}
      </div>
      {canvasData.length ? (
        <div className="">
          <Draggable
            canvasData={canvasData}
            draggableData={draggableData}
            setDraggableData={setDraggableData}
          ></Draggable>
        </div>
      ) : null}
    </section>
  );
};

export default DraggableCanvas;
