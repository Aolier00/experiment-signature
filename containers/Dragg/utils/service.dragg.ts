import { CanvasInterface } from '../domain/Dragg';

export const isInsideRect = (draggable: DOMRect, canva: DOMRect, candaIndex: number) => {
    console.log({ canva: candaIndex, x: canva.x, y: canva.y })
    return (
        draggable.left >= canva.left &&
        draggable.right <= canva.right &&
        draggable.top >= canva.top &&
        draggable.bottom <= canva.bottom
    );
};
//en esta validare en que canva esta el drop que arrastre
export const positionCanva = (draggable: Element | null, arrCanva: Array<CanvasInterface>): number => {
    let data: boolean[] = []; // Inicializamos data como un array vacío
    arrCanva.forEach((canva, i) => {
        const canvasRect = canva.clientRect?.getBoundingClientRect()
        if (draggable) {
            const draggRect = draggable.getBoundingClientRect();
            if (canvasRect && draggRect) {
                data.push(isInsideRect(draggRect, canvasRect, i));
            }
        }
    });
    return data.findIndex((item) => item);
};