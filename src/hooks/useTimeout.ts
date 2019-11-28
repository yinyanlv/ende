import {useEffect, useRef} from 'react';

export function useTimeout(callback: Function, delay: number = 0) {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (callback && typeof callback === 'function') {
            const timer = setTimeout(callbackRef.current, delay);

            return () => {
                if (timer) {
                    clearTimeout(timer);
                }
            };
        }
    }, [callback, delay]);
}
