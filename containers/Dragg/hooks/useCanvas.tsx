import { AppContext, AppContextType } from "@/containers/AppContext";
import { useContext, useEffect, useState } from "react";
import { CanvasInterface } from "../domain/Dragg";
import { useRouter } from "next/router";
export default function useCanvas(): {
  canvasData: CanvasInterface[];
  setCanvasData: (value: CanvasInterface[]) => void;
} {
  const [images, setImages] = useState<string[]>([]);
  const [canvasData, setCanvasData] = useState<CanvasInterface[]>([]);
  const { file } = useContext(AppContext) as AppContextType;
  const router = useRouter();

  const convertPngOrJpgToBase64 = async (file: File): Promise<string[]> => {
    const base64 = await readFileData(file);
    return base64 ? [base64 as string] : [];
  };

  const convertFileToBase64 = async (file: File): Promise<string[]> => {
    const fileType = file.type;
    if (fileType === "application/pdf") {
      return convertPdfToImages(file);
    } else if (fileType === "image/png" || fileType === "image/jpeg") {
      return convertPngOrJpgToBase64(file);
    } else {
      throw new Error("Unsupported file type");
    }
  };

  const convertPdfToImages = async (file: File): Promise<string[]> => {
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

  const loadPdfContent = async (file: File) => {
    if (file) {
      const convertedImages = await convertFileToBase64(file);
      setImages(convertedImages);
    }
  };

  useEffect(() => {
    if (!file) {
      router.push("/");
      return;
    }
    loadPdfContent(file);
  }, [file]);

  useEffect(() => {
    if (images.length && !canvasData.length) {
      let data: CanvasInterface[] = images.map((item) => {
        return { clientRect: null, children: item };
      });
      setCanvasData(data);
    }
  }, [images.length, images]);

  return { canvasData, setCanvasData };
}
