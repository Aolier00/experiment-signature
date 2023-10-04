import React, { ReactNode, useEffect, useRef } from 'react'
import { CanvaInterface } from '../domain/Dragg'


type PropsCanva = {
    setCanvaData: (arg: CanvaInterface[]) => void
    canvaData: CanvaInterface[];
    index: number,
    base64: string
}
const Canva = ({ setCanvaData, canvaData, index, base64 }: PropsCanva) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        const copy = [...canvaData];
        copy[index].clientRect = canvasRef.current
        setCanvaData(copy);
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
        <>
            <canvas
                ref={canvasRef}
                className="border border-gray-300 w-6/12 h-screen"
            ></canvas>
        </>
    )
}
export default Canva
