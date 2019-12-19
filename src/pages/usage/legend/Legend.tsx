import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SvgHotPoint} from '@/components/svg-hot-point';
import {API_PREFIX} from '@/config';
import styles from './Legend.module.scss';
import {Icon} from "antd";

const svgPrefix = '/res';

interface LegendProps {
    isShowLegend: boolean;
    isShowGroups: boolean;
    activeCallout?: string;
    onSelectCallout: Function;
    onClickLeftArrow?: Function;
    onClickRightArrow?: Function;
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
            // svgHotPointRef.current.loadSVG(API_PREFIX + svgPrefix + svgUri);
            svgHotPointRef.current.loadSVG('/images/A-0001.svg');
        } else {
            svgHotPointRef.current.loadDefaultImg();
        }

    }, [svgUri]);

    useEffect(() => {
        if (props.activeCallout) {
            svgHotPointRef.current.activeCallout([props.activeCallout]);
        }
    }, [dispatch, props.activeCallout]);

    function handleSelectCallout(callout) {
        props.onSelectCallout(callout);
    }

    function handleLegendLoaded() {
        if (props.activeCallout) {
            svgHotPointRef.current.activeCallout([props.activeCallout]);
        }
    }

    function handleClickLeftArrow() {
        props.onClickLeftArrow && props.onClickLeftArrow();
    }

    function handleClickRightArrow() {
        props.onClickRightArrow && props.onClickRightArrow();
    }

    return (
        <div className={styles.legendWrapper} style={{display: props.isShowLegend ? 'flex' : 'none'}}>
            <div className="panel panel-legend">
                <SvgHotPoint
                    ref={svgHotPointRef}
                    noPicPath={'/images/nopic.gif'}
                    onSelectCallout={handleSelectCallout}
                    onLegendLoaded={handleLegendLoaded}
                />

            </div>
            {
                props.isShowGroups ? (
                    <span className="btn-arrow left-arrow" onClick={handleClickLeftArrow}><Icon type="left" /></span>
                ) : (
                    <span className="btn-arrow right-arrow" onClick={handleClickRightArrow}><Icon type="right" /></span>
                )
            }
        </div>
    );
}

export default React.memo(Legend);
