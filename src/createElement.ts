import { TEXT_ELEMENT } from "./const";

function createTextElement(text: String) {
    return {
        type: TEXT_ELEMENT,
        props: {
            nodeValue: text,
            children: [],
        },
    };
}

function createElement(tagName: string, props: object|null, ...children: (Object|String)[]) {
    return {
        type: tagName,
        props: {
            ...props,
            children: children.map(child => {
                if(typeof child === 'string') {
                    return createTextElement(child);
                }

                return child;
            }),
        },
    };
}

export default createElement;
