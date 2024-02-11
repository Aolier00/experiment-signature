import React, { ReactNode, useEffect, useRef } from 'react'
import { CanvasInterface } from '../domain/Dragg'


type PropsCanvas = {
    setCanvasData: (arg: CanvasInterface[]) => void
    canvasData: CanvasInterface[];
    index: number,
    base64: string
}
const Canvas = ({ setCanvasData, canvasData, index, base64 }: PropsCanvas) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        const copy = [...canvasData];
        copy[index].clientRect = canvasRef.current
        setCanvasData(copy);
    }, [canvasRef]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.src = base64;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx && ctx.drawImage(img, 0, 0);
            console.log(ctx)
        };
    }, [canvasRef]);

    return (
        <canvas
            ref={canvasRef}
            className="border border-gray-300 w-full h-screen"
        ></canvas>
    )
}
export default Canvas
