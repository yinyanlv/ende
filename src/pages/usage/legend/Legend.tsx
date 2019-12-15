import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SvgHotPoint} from '@/components/svg-hot-point';
import {usageCreator} from '@/pages/usage/actions';
import {API_PREFIX} from '@/config';
import './Legend.module.scss';

const svgPrefix = '/res';

interface LegendProps {
    isShow: boolean;
    activeCallout?: string;
}

function Legend(props: LegendProps) {
    const dispatch = useDispatch();
    const svgHotPointRef: any = useRef(null);
    const {
        svgUri
    } = useSelector((state: any) => {
        return state.legend;
    });

    useEffect(() => {

        if (svgHotPointRef && svgHotPointRef.current && svgUri) {
            svgHotPointRef.current.loadSVG(API_PREFIX + svgPrefix + svgUri);
        } else {
            // svgHotPointRef.current.loadDefaultImg();
            svgHotPointRef.current.loadSVG('/images/A-0001.svg');
        }

    }, [svgUri]);

    useEffect(() => {
        if (props.activeCallout) {
            svgHotPointRef.current.activeCallout([props.activeCallout]);
        }
    }, [dispatch, props.activeCallout]);

    function selectCalloutHandler(callout) {
        dispatch(usageCreator.setActiveCallout(callout));
    }

    return (
        <div className="panel panel-legend" style={{display: props.isShow ? 'flex' : 'none'}}>
            <SvgHotPoint
                ref={svgHotPointRef}
                noPicPath={'/images/nopic.gif'}
                onSelectCallout={selectCalloutHandler}
            />
        </div>
    );
}

export default React.memo(Legend);