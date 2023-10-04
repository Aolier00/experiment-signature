import interact from "interactjs";
import { useEffect, useRef, useState } from "react";
import { CanvaInterface, DraggableInterface } from "../domain/Dragg";
import { positionCanva } from "../service.dragg";

type Props = {
    canvasData: CanvaInterface[];
    draggableData: DraggableInterface[];
    setDraggableData: (arg: DraggableInterface[]) => void
}

const Draggable = ({ canvasData, draggableData, setDraggableData }: Props) => {
    function onHandle(element: Element | null, index: number): void {
        const copy = [...draggableData];
        copy[index].clientRect = element;
        setDraggableData(copy);
    }
    return (
        <div>
            {draggableData.map((item, i) => (
                <Dragg arrCanva={canvasData} arrDraggable={draggableData} draggableItem={item} index={i} onHandle={onHandle} text={item.name ?? 'dragg'} key={i} />
            ))}
        </div>
    )
}

export default Draggable



type PropsDragg = {
    text: string,
    onHandle: (element: Element | null, index: number) => void,
    index: number,
    arrCanva: Array<CanvaInterface>,
    arrDraggable: Array<DraggableInterface>,
    draggableItem: DraggableInterface
}
const Dragg = ({ text, onHandle, index, arrCanva, arrDraggable }: PropsDragg) => {
    const draggableRef = useRef<HTMLDivElement | null>(null);
    const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const initInteractJS = () => {
            interact(`.draggable-item${index}`).draggable({
                listeners: {
                    start(event) {
                        event.target.style.zIndex = '9999';
                    },
                    move(event) {
                        const { target } = event;
                        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                        target.style.transform = `translate(${x}px, ${y}px)`;
                        target.setAttribute('data-x', x.toString());
                        target.setAttribute('data-y', y.toString());
                    },

                    //verifica cada canva, de acuerdo a su tamaño
                    end(event) {
                        event.target.style.zIndex = 'auto';


                        const draggableRect = draggableRef.current?.getBoundingClientRect();
                        onHandle(draggableRef.current, index);
                        if (
                            arrDraggable &&
                            arrCanva &&
                            draggableRect
                        ) {

                            let positionInfo = '';
                            positionInfo = `Canvas ${positionCanva(draggableRef.current, arrCanva)}`;
                            if (positionCanva(draggableRef.current, arrCanva) >= 0) {
                                console.log(positionInfo)
                            } else {
                                resetPosition();
                            };
                        }
                    },
                },
            });
        };
        initInteractJS();
    }, []);

    const handleDragStart = (event: React.MouseEvent) => {
        // Al inicio del arrastre, registra la posición inicial
        const draggableElement = draggableRef.current;

        if (draggableElement) {
            const x = event.clientX - draggableElement.getBoundingClientRect().left;
            const y = event.clientY - draggableElement.getBoundingClientRect().top;
            setInitialPosition({ x, y });
        }

    };

    const resetPosition = () => {
        const draggable = draggableRef.current;

        if (draggable) {
            draggable.style.transform = `translate(${initialPosition.x}px, ${initialPosition.y}px)`;
            draggable.setAttribute('data-x', initialPosition.x.toString());
            draggable.setAttribute('data-y', initialPosition.y.toString());
        }
    };

    return (
        <div>
            <div ref={draggableRef}
                className={`draggable-item${index} bg-blue-500 w-16 h-16 text-white flex items-center justify-center`}
                style={{ cursor: 'grab' }}
                data-x="0"
                data-y="0"
                onMouseDown={handleDragStart}
            >{text}</div>
        </div>
    )
}