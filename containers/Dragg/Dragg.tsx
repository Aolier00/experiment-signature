import React, { useState } from 'react';
import Draggable from '../DraggComponents/components/Draggable';
import { CanvaInterface, DraggableInterface, dataCanva, dataDraggable } from '../DraggComponents/domain/Dragg';
import Canva from '../DraggComponents/components/Canva';

const DraggableCanvas: React.FC = () => {

  const [draggableData, setDraggableData] = useState<DraggableInterface[]>(dataDraggable);
  const [canvaData, setCanvaData] = useState<CanvaInterface[]>(dataCanva)
  return (
    <div>
      <Draggable canvasData={canvaData} draggableData={draggableData} setDraggableData={setDraggableData}></Draggable>
      <div className='flex'>
        {
          canvaData.map((item, i) => (
            <Canva canvaData={canvaData} index={i} setCanvaData={setCanvaData} key={i}></Canva>
          ))
        }
      </div>
    </div>
  );
};

export default DraggableCanvas;
