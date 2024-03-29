
export interface CanvasInterface {
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
        name: 'drag 1'
    },
    {
        clientRect: null,
        name: 'drag 2'
    },
    {
        clientRect: null,
        name: 'drag 2'
    },
]

