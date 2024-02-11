import { useEffect, useRef, useState } from "react";
import { CanvasInterface, DraggableInterface } from "../domain/Dragg";
import interact from "interactjs";
import { positionCanva } from "../utils/service.dragg";

type PropsDrag = {
    text: string,
    onHandle: (element: Element | null, index: number) => void,
    index: number,
    arrCanva: Array<CanvasInterface>,
    arrDraggable: Array<DraggableInterface>,
    draggableItem: DraggableInterface
}
export const Drag = ({ text, onHandle, index, arrCanva, arrDraggable }: PropsDrag) => {
    const draggableRef = useRef<HTMLDivElement | null>(null);
    const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const initInteractJS = () => {
            interact(`.draggable-item${index}`)
                .draggable({
                    autoScroll: {
                        container: document.querySelector('#auto-scroll') as HTMLElement,
                        margin: 50,
                        distance: 5,
                        interval: 10,
                        speed: 300,
                    },
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