export interface ReactElement {
    type: String,
    props: {
        children: ReactElement[],
        [key: string]: any,
    }
};

export interface Fiber {
    dom: Node|null,
    element?: ReactElement,
    parent: Fiber|null,
    sibling?: Fiber|null,
    child?: Fiber|null,
}
