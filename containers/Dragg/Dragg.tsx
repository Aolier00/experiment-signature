import React, { useEffect, useMemo, useState } from 'react';
import Draggable from '../DraggComponents/components/Draggable';
import { CanvaInterface, DraggableInterface, dataDraggable } from '../DraggComponents/domain/Dragg';
import Canva from '../DraggComponents/components/Canva';

const DraggableCanvas: React.FC = () => {

  const [draggableData, setDraggableData] = useState<DraggableInterface[]>(dataDraggable);
  const [canvaData, setCanvaData] = useState<CanvaInterface[]>([])
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState<string[]>([]);

  const uploadImg = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const convertPdfToImages = async (file: File) => {
    const PDFJS = require("pdfjs-dist/webpack");
    const images = [];
    const data = await readFileData(file);
    const pdf = await PDFJS.getDocument(data).promise;
    const canvas = document.createElement("canvas");
    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const viewport = page.getViewport({ scale: 1.5 });
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport: viewport }).promise;
      images.push(canvas.toDataURL());
    }
    canvas.remove();
    return images;
  };

  const readFileData = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e?.target?.result);
      };
      reader.onerror = (err) => {
        reject(err);
      };
      reader.readAsDataURL(file);
    });
  };


  const loadPdfContent = async () => {
    if (selectedFile) {
      const convertedImages = await convertPdfToImages(selectedFile);
      setImages(convertedImages);
      // Aquí puedes usar convertedImages para mostrar las imágenes en algún lugar
    }
  };

  useEffect(() => {
    if (images.length) {
      const data: CanvaInterface[] = images.map((item) => {
        return { clientRect: null, children: item }
      });
      setCanvaData(data);
    }
  }, [images.length, images])

  return (
    <div>
      <div>
        <input
          type="file"
          id="fileInput"
          accept=".pdf, .docx, .jpg"
          onChange={uploadImg}
        />
      </div>
      <button onClick={loadPdfContent}>Cargar PDF y Convertir a Imágenes</button>
      <div className='flex gap-2'>
        {canvaData.length ?
          <>
            <Draggable canvasData={canvaData} draggableData={draggableData} setDraggableData={setDraggableData}></Draggable>
            <div className='flex flex-col space-y-2'>
              {canvaData.map((item, i) => (
                <Canva canvaData={canvaData} index={i} setCanvaData={setCanvaData} key={i} base64={item.children} />
              ))}
            </div>
          </>
          : null}
      </div>
    </div>
  );
};

export default DraggableCanvas;