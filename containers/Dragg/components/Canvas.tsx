import React, { useEffect, useRef } from "react";
import { CanvasInterface } from "../domain/Dragg";

type PropsCanvas = {
  setCanvasData: (arg: CanvasInterface[]) => void;
  canvasData: CanvasInterface[];
  index: number;
  base64: string;
};
const Canvas = ({ setCanvasData, canvasData, index, base64 }: PropsCanvas) => {
  let divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!divRef) return;
    const copy = [...canvasData];
    copy[index].clientRect = divRef.current;
    setCanvasData(copy);
  }, [divRef]);

  return (
    <div className="relative w-full h-full" ref={divRef}>
      <div
        id={index.toString()}
        style={{
          // height: '1000px',
          padding: "10px",
          marginTop: "4px",
          backgroundImage: `url(${base64})`,
          height: "100%",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
        className="w-full"
      ></div>
      <div className={`absolute z-10 h-full w-full top-0 canva-${index}`}></div>
    </div>
  );
};
export default Canvas;
