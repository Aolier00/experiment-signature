import React, { useEffect, useMemo, useState } from 'react';
import Draggable from './components/Draggable';
import { CanvasInterface, DraggableInterface, dataDraggable } from './domain/Dragg';
import Canvas from './components/Canvas';
import useCanvas from './hooks/useCanvas';

const DraggableCanvas: React.FC = () => {

  const [draggableData, setDraggableData] = useState<DraggableInterface[]>(dataDraggable);
  const { canvasData, setCanvasData } = useCanvas();

  return (
    <section className='h-screen flex flex-row'>
      <div id='auto-scroll' className='flex gap-2 w-10/12 justify-center h-screen overflow-auto' >
        {canvasData.length ?
          <div className='flex flex-col space-y-2'>
            {canvasData.map((item, i) => (
              <Canvas canvasData={canvasData} index={i} setCanvasData={setCanvasData} key={i} base64={item.children} />
            ))}
          </div>
          : null}
      </div>
      <div className=''>
        <Draggable canvasData={canvasData} draggableData={draggableData} setDraggableData={setDraggableData}></Draggable>
      </div>
    </section>
  );
};

export default DraggableCanvas;