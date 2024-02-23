import { useEffect, useId, useRef, useState } from "react";
import { CanvasInterface, DraggableInterface } from "../domain/Dragg";
import interact from "interactjs";
import { getPositionInsideRect, positionCanva } from "../utils/service.dragg";

type PropsDrag = {
  text: string;
  onHandle: (element: Element | null, index: number) => void;
  index: number;
  arrCanva: Array<CanvasInterface>;
  arrDraggable: Array<DraggableInterface>;
  draggableItem: DraggableInterface;
};
export const Drag = ({
  text,
  onHandle,
  index,
  arrCanva,
  arrDraggable,
}: PropsDrag) => {
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  let currentDraggable: any = null;
  const interactInstanceRef = useRef<any>(null);
  const interactScroll = useRef<any>(null);
  let { beforeY, beforeX } = { beforeX: 0, beforeY: 0 };
  let { afterY, afterX } = { afterX: 0, afterY: 0 };
  const id = useId();

  const autoScroll = document.querySelector("#auto-scroll");
  useEffect(() => {
    if (arrCanva.length === 0) return;
    const initInteractJS = () => {
      interactInstanceRef.current = interact(
        `.draggable-item${index}`
      ).draggable({
        autoScroll: {
          container: autoScroll as HTMLElement,
          margin: 50,
          distance: 5,
          interval: 10,
          speed: 300,
        },
        listeners: {
          start(event) {
            event.target.style.zIndex = "9999";
            currentDraggable = event.target;
          },
          move(event) {
            const { target } = event;
            const distanceY = event.pageY - target.getBoundingClientRect().top;
            const x =
              (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
            const y =
              (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
            const distMouse = target.id ? distanceY : 0;
            // translate the element
            target.style.transform = `translate(${x}px, ${y + distMouse}px)`;
            // update the posiion attributes
            target.setAttribute("data-x", x.toString());
            target.setAttribute("data-y", (y + distMouse).toString());
          },

          //verifica cada canva, de acuerdo a su tamaño
          end(event) {
            currentDraggable = null;
            const { target } = event;
            event.target.style.zIndex = "auto";
            const draggableRect = target.getBoundingClientRect();
            const page = positionCanva(target, arrCanva);
            const clientRefCanva =
              arrCanva[page]?.clientRect?.getBoundingClientRect();
            onHandle(target, index);

            if (arrCanva && draggableRect && clientRefCanva) {
              const position = getPositionInsideRect(
                draggableRect,
                clientRefCanva
              ); //get position inside the canva

              if (page >= 0 && position != null) {
                const divCanva = document.querySelector(`.canva-${page}`);
                target.id = target.id ? target.id : id;
                if (divCanva) {
                  divCanva?.appendChild(event.target);
                  event.target.setAttribute("data-x", position.x);
                  event.target.setAttribute("data-y", position.y);
                  target.style.transform = `translate(${position.x}px, ${position.y}px)`;
                  target.classList.remove("relative");
                  target.classList.add("absolute");
                }
              } else {
                resetPosition(event);
              }
            }
          },
        },
      });

      interactScroll.current = interact(autoScroll as HTMLElement).on(
        "scroll",
        function () {
          if (!currentDraggable) return;

          if (currentDraggable?.id) {
            beforeY = afterY;
            beforeX = afterX;

            if (afterY == 0 && beforeY == 0)
              beforeY = autoScroll?.scrollTop ?? 0;
            if (afterX == 0 && beforeX == 0)
              beforeX = autoScroll?.scrollLeft ?? 0;

            afterY = autoScroll?.scrollTop ?? 0;
            afterX = autoScroll?.scrollLeft ?? 0;

            const y =
              (parseInt(currentDraggable.getAttribute("data-y")) || 0) +
              (afterY - beforeY);
            const x =
              (parseInt(currentDraggable.getAttribute("data-x")) || 0) +
              (afterX - beforeX);

            // translate the element
            currentDraggable.style.webkitTransform =
              currentDraggable.style.transform =
                "translate(" + x + "px, " + y + "px)";

            // update the position attributes
            currentDraggable.setAttribute("data-x", x);
            currentDraggable.setAttribute("data-y", y);
          }
        }
      );
    };
    initInteractJS();
    return () => {
      //disassembles the draggable
      if (interactInstanceRef.current) {
        interactInstanceRef.current.unset();
      }
      if (interactScroll.current) {
        interactScroll.current.unset();
      }
    };
  }, [arrCanva]);

  const resetPosition = (Element: any) => {
    const draggable = Element.target as HTMLElement;
    if (draggable) {
      draggable.style.transform = `translate(${initialPosition.x}px, ${initialPosition.y}px)`;
      draggable.setAttribute("data-x", initialPosition.x.toString());
      draggable.setAttribute("data-y", initialPosition.y.toString());
    }
  };

  return (
    <div>
      <div
        className={`draggable-item${index} bg-blue-500 w-16 h-16 text-white flex items-center justify-center relative`}
        style={{ cursor: "grab", zIndex: 10000 }}
        data-x="0"
        data-y="0"
      >
        {text}
      </div>
    </div>
  );
};
