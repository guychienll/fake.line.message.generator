import { useRef, useState } from 'react';

export function useLongPress(ms = 1000) {
    let timer = useRef(undefined).current;
    const [isLongPressing, setIsLongPressing] = useState(false);

    return {
        onMouseDown: (e) => {
            e.stopPropagation();
            timer = setTimeout(() => {
                setIsLongPressing(true);
            }, ms);
        },
        onMouseUp: (e) => {
            e.stopPropagation();
            clearTimeout(timer);
            setIsLongPressing(false);
        },
        isLongPressing,
    };
}
