import { CanvasInterface, DraggableInterface } from "../domain/Dragg";
import { Drag } from "./Drag";

type Props = {
    canvasData: CanvasInterface[];
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
                <Drag arrCanva={canvasData} arrDraggable={draggableData} draggableItem={item} index={i} onHandle={onHandle} text={item.name ?? 'dragg'} key={i} />
            ))}
        </div>
    )
}

export default Draggable


