import { TEXT_ELEMENT } from './const';
import createDOM from './createDOM';
import { Fiber, ReactElement } from './types';

let nextUnitOfWork: Fiber = null;

function commitRoot() {
    commitWork(wipRoot.child);
    wipRoot = null;
}

function commitWork(fiber) {
    if(!fiber) {
        return;
    }

    const parentDOM = fiber.parent.dom;
    if(parentDOM) {
        parentDOM.appendChild(fiber.dom);
    }
    commitWork(fiber.child);
    commitWork(fiber.sibling);
}

let wipRoot: Fiber = null;

function workLoop(deadline: IdleDeadline) {
    let shouldYield = false;

    while(nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() > 0;
    }

    if(!nextUnitOfWork && wipRoot) {
        commitRoot();
    }

    requestIdleCallback(workLoop)
}

function performUnitOfWork(fiber: Fiber) {
    // create dom
    if(!fiber.dom) {
        fiber.dom = createDOM(fiber.element);
    }

    // create new fiber
    let prevFiber = null;
    fiber.element.props.children.forEach((child, index) => {
        const newFiber: Fiber = {
            dom: null,
            element: child,
            parent: fiber,
        };

        if(index === 0) {
            fiber.child = newFiber;
        } else {
            prevFiber.sibling = newFiber;
            prevFiber = newFiber;
        }
    })

    // return next unit of work
    if(fiber.child) {
        return fiber.child;
    }
    // child -> sibling -> uncel(parent's sibling)
    let nextFiber = fiber;
    while(nextFiber) {
        if(nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.parent;
    }
    return nextFiber;
}

requestIdleCallback(workLoop);

function render(element: ReactElement, container: HTMLElement) {
    if(!container) {
        console.error('container should not be null');
        return;
    }

    wipRoot = {
        dom: container,
        element: {
            props: {
                children: [element],
            },
        }
    };
    nextUnitOfWork = wipRoot;
}

export default render;
