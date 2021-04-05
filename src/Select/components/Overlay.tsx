import React from 'react';
import ReactDOM from 'react-dom';


export type Coords = {
    top: number;
    left: number;
};

type Props = {
    visible: boolean;
    coordinates: Coords | null;
    children: React.ReactNode;
    onClose: () => void;
}

const classList = {
    overlay: 'overlay',
    inner: 'overlay-inner',
};

const Overlay: React.FC<Props> = ({visible, children, onClose, coordinates}: Props) => {

    const bodyRef: React.RefObject<Element> = React.useRef<Element>(document.querySelector('body'));

    const overlayRef: React.MutableRefObject<Element | null> = React.useRef<Element | null>(null);

    const [inner, setInner] = React.useState<Element | null>(null);

    const createOverlay = () => {
        if (!bodyRef.current || overlayRef.current !== null) {
            return;
        }

        const divRoot = document.createElement('div');
        divRoot.classList.add(classList.overlay);

        const divInner = document.createElement('div');
        divInner.classList.add(classList.inner);

        divInner.style.top = `${coordinates?.top}px`;
        divInner.style.left = `${coordinates?.left}px`;

        divRoot.append(divInner);

        bodyRef.current.appendChild(divRoot);

        setInner(divInner);
        overlayRef.current = divRoot;
    };

    const clearOverlay = () => {
        overlayRef.current?.remove();
        overlayRef.current = null;
        setInner(null);
    }

    React.useEffect(() => {
        if (visible && coordinates !== null) {
            createOverlay();
        } else {
            clearOverlay();
        }
    }, [visible, coordinates])

    const handleClick = (event: Event) => {
        const target = event.target as HTMLElement;

        if (target.classList.contains(classList.overlay) || target.classList.contains(classList.inner)) {
            onClose();
        }
    };

    React.useEffect(() => {
        if (!overlayRef.current) {
            return;
        }

        overlayRef.current.addEventListener('click', handleClick);

        return () => {
            if (!overlayRef.current) {
                return;
            }
            overlayRef.current.removeEventListener('click', handleClick);
        };
    }, [onClose]);

    React.useEffect(() => {
        return clearOverlay;
    }, []);

    if (bodyRef.current === null) {
        return null;
    }

    return visible && inner ? ReactDOM.createPortal(children, inner) : null;
};

export default Overlay;