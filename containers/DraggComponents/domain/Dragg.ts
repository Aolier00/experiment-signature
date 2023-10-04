
export interface CanvaInterface {
    clientRect?: Element | null;
    children:string
}

export interface DraggableInterface {
    clientRect?: Element | null;
    name?: string,
}


export const dataDraggable: DraggableInterface[] = [
    {
        clientRect: null,
        name: 'dragg 1'
    },
    {
        clientRect: null,
        name: 'dragg 2'
    }
]

