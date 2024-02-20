import { ReactElement } from './types';
import { TEXT_ELEMENT } from "./const";

function createDOM(element: ReactElement) {
    const { type, props } = element;

    const dom = type === TEXT_ELEMENT 
        ? document.createTextNode("")
        // @ts-ignore
        : document.createElement(type);

    Object.keys(props)
        .filter(key => key !== 'children')
        .forEach(key => {
            dom[key] = props[key];
        });

    return dom;
}

export default createDOM;
