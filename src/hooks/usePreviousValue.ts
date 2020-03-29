import {useRef, useEffect} from 'react';

export function usePreviousValue(value: any) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}
