import { CanvasInterface } from '../domain/Dragg';

export const isInsideRect = (draggable: DOMRect, canva: DOMRect) => {
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
                data.push(isInsideRect(draggRect, canvasRect));
            }
        }
    });
    return data.findIndex((item) => item);
};

export const getPositionInsideRect = (
    draggable: DOMRect,
    canva: DOMRect
  ): { x: number; y: number } | null => {
    if (isInsideRect(draggable, canva)) {
      const x = draggable.left - canva.left;
      const y = draggable.top - canva.top;
      return { x, y };
    } else {
      return null; // El "draggable" no está completamente dentro del "canva"
    }
  };