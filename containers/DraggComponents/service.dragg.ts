import { CanvaInterface } from './domain/Dragg';

export const isInsideRect = (draggable: DOMRect, canva: DOMRect) => {
    return (
        draggable.left >= canva.left &&
        draggable.right <= canva.right &&
        draggable.top >= canva.top &&
        draggable.bottom <= canva.bottom
    );
};
//en esta validare en que canva esta el drop que arrastre
export const positionCanva = (draggable: Element | null, arrCanva: Array<CanvaInterface>): number => {
    let data: boolean[] = []; // Inicializamos data como un array vacío
    arrCanva.forEach((canva) => {
        const canvasRect = canva.clientRect?.getBoundingClientRect()
        if (draggable) {
            const draggRect = draggable.getBoundingClientRect();
            if (canvasRect && draggRect) {
                data.push(isInsideRect(draggRect, canvasRect));
            }
        }
    });
    return data.findIndex((item) => item);
};

//console.log(positionCanva([{myref_draggable:draggableRef}],[{myref_cava:canvasRef1}, {myref_cava:canvasRef2}]))
