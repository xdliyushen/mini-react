import { TEXT_ELEMENT } from './const';
import { ReactElement } from './types';

function render(element: ReactElement, container: HTMLElement|Text|null) {
    if(!container) {
        console.error('container should not be null');
        return;
    }

    const { type, props } = element;
    const { children, ...extraProps } = props;

    const dom = type === TEXT_ELEMENT 
        ? document.createTextNode("")
        // @ts-ignore
        : document.createElement(type);

    for(const key in extraProps) {
        dom[key] = extraProps[key];
    }

    children.forEach(child => {
        render(child, dom);
    });

    container.appendChild(dom);
}

export default render;
