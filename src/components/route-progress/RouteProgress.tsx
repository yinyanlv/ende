import {useState, useEffect} from 'react';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {useTimeout} from '@/hooks';
import './RouteProgress.module.scss';

interface RouteProgressProps {
    delay?: number;
}

export function RouteProgress(props: RouteProgressProps) {
    const [isShowProgress, setIsShowProgress] = useState(!props.delay);

    useTimeout(() => {
        setIsShowProgress(true);
    }, props.delay);

    useEffect(() => {
        nProgress.done();
    });

    if (isShowProgress) {
        nProgress.start();
    } else {
        nProgress.done();
    }
    return null;
}
