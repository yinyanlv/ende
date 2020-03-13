import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import {SvgHotPoint} from '@/components/svg-hot-point';
import {API_PREFIX} from '@/config';
import styles from './Legend.module.scss';
import queryString from 'query-string';
import {getQueryObj} from '@/common/utils';
import {message} from 'antd';
import {groupsCreator} from '@/pages/usage/groups/actions';

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
    const {
        flatPathList,
        activeTreeNodeCode,
        expandedTreeNodeCodes
    } = useSelector((state: any) => {
        return state.groups;
    });

    useEffect(() => {

        if (svgHotPointRef && svgHotPointRef.current && svgUri) {
            svgHotPointRef.current.loadSVG(API_PREFIX + svgPrefix + svgUri);
            // svgHotPointRef.current.loadSVG('/images/A-0001.svg');
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

    function handleClickPrev() {
        const curIndex = getIndex(activeTreeNodeCode);
        if (curIndex === 0) {
           return message.error('当前已经是第一张');
        }
        const prevIndex = curIndex - 1;
        const pathList = flatPathList[prevIndex].split('/');
        dispatch(groupsCreator.setExpandedTreeNodeCodes([...expandedTreeNodeCodes, pathList[0]]));
        dispatch(groupsCreator.setActiveTreeNodeCode(pathList[1]));
        loadParts();
    }

    function handleClickNext() {
        const curIndex = getIndex(activeTreeNodeCode);
        if (curIndex === flatPathList.length - 1) {
            return message.error('当前已经是第一张');
        }
        const nextIndex = curIndex + 1;
        const pathList = flatPathList[nextIndex].split('/');
        dispatch(groupsCreator.setExpandedTreeNodeCodes([...expandedTreeNodeCodes, pathList[0]]));
        dispatch(groupsCreator.setActiveTreeNodeCode(pathList[1]));
        loadParts();
    }

    function getIndex(code): number {
        for (let i = 0; i < flatPathList.length; i++) {
            if(flatPathList[i].endsWith(`/${code}`)) {
                return i;
            }
        }
        return 0;
    }

    function loadParts() {
        const node: any = document.querySelector('.panel-tree .ant-tree-node-selected');
        if (node && node.click) {
            node.click();
            node.scrollIntoView();
        }
    }

    function handleClickPrint() {
        const queryObj = getQueryObj();
        const search = queryString.stringify(Object.assign({}, queryObj, {
            src: API_PREFIX + svgPrefix + svgUri
        }));
        window.open('/print-legend?' + search);
    }

    return (
        <div className={styles.legendWrapper} style={{display: props.isShowLegend ? 'flex' : 'none'}}>
            <div className="panel panel-legend">
                <SvgHotPoint
                    ref={svgHotPointRef}
                    noPicPath={'/images/nopic.gif'}
                    onSelectCallout={handleSelectCallout}
                    onLegendLoaded={handleLegendLoaded}
                    onClickPrev={handleClickPrev}
                    onClickNext={handleClickNext}
                    onClickPrint={handleClickPrint}
                />
            </div>
            {
                props.isShowGroups ? (
                    <span className="btn-arrow left-arrow" onClick={handleClickLeftArrow}><LeftOutlined/></span>
                ) : (
                    <span className="btn-arrow right-arrow" onClick={handleClickRightArrow}><RightOutlined/></span>
                )
            }
        </div>
    );
}

export default React.memo(Legend);
