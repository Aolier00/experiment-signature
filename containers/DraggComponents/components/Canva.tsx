import React, { useEffect, useRef } from 'react'
import { CanvaInterface, dataCanva } from '../domain/Dragg'


type PropsCanva = {
    setCanvaData: (arg: CanvaInterface[]) => void
    canvaData: CanvaInterface[];
    index: number
}
const Canva = ({ setCanvaData, canvaData, index }: PropsCanva) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        const copy = [...dataCanva];
        copy[index].clientRect = canvasRef.current
        setCanvaData(copy);
    }, [canvasRef])
    return (
        <>
            <canvas
                ref={canvasRef}
                className="border border-gray-300 w-1/2 h-screen"
            ></canvas>
        </>
    )
}
export default Canva
