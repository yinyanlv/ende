import React, {useEffect, useRef, Ref} from 'react';
import {Crumbs} from '@/components/crumbs';
import {SvgHotPoint} from '@/components/svg-hot-point';

export function PageUsage() {
    const svgHotPointRef: Ref<SvgHotPoint> | null = useRef(null);

    useEffect(() => {
        if (svgHotPointRef && svgHotPointRef.current) {
            svgHotPointRef.current.loadSVG('/images/A-0001.svg');
        }
    });

    function legendLoadedHandler() {
        console.log('onLegendLoaded');
    }

    function selectCalloutHandler() {
        console.log(arguments);
    }

    return (
        <>
            <Crumbs />
            <div style={{
                width: '500px',
                height: '400px'
            }}>
                <SvgHotPoint ref={svgHotPointRef} onLegendLoaded={legendLoadedHandler} onSelectCallout={selectCalloutHandler} />
            </div>
        </>
    );
}
