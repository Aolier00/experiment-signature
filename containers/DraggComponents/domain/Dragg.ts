export interface CanvaInterface {
    clientRect?: Element | null;
}

export interface DraggableInterface {
    clientRect?: Element | null;
    name?: string
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

export const dataCanva: CanvaInterface[] = [
    {
        clientRect: null
    },
    {
        clientRect: null
    }
]