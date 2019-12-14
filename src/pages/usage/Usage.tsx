import React, {useEffect, useCallback, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cls from 'classnames';
import {API_PREFIX} from '@/config';
import {updateLocationSearch, getCleanQueryObj} from '@/common/utils';
import {Panel} from '@/components/panel';
import {SvgHotPoint} from '@/components/svg-hot-point';
import {crumbsCreator} from '@/pages/common/crumbs/actions';
import {groupsCreator, partsCreator, usageCreator} from './actions';
import {Groups} from './groups';
import {Legends} from './legends';
import {Parts} from './parts';
import styles from './usage.module.scss';

const svgPrefix = '/res';

export function PageUsage() {
    const svgHotPointRef: any = useRef(null);
    const dispatch = useDispatch();
    const {
        activeCallout,
        isShowParts,
        isPartsLoading,
        parts
    } = useSelector((state: any) => {
        return state.usage;
    });

    useEffect(() => {
        const queryObj = getCleanQueryObj();
        dispatch(groupsCreator.load(queryObj));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const showParts = useCallback((params) => {
        const queryObj = getCleanQueryObj();
        const codes = params.codePathList;
        const codesMap = rebuildCodes(codes);

        dispatch(usageCreator.setActiveTreeNodeCode(params.code));
        dispatch(usageCreator.setIsShowParts(true));
        loadSvg(params.svgFileUri);
        const temp = Object.assign({}, queryObj, codesMap);
        dispatch(partsCreator.load(temp));
        dispatch(crumbsCreator.load(temp));
        updateLocationSearch(temp);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function loadSvg(svgUrl) {
        if (svgHotPointRef && svgHotPointRef.current && svgUrl) {
            svgHotPointRef.current.loadSVG(API_PREFIX + svgPrefix + svgUrl);
        } else {
            // svgHotPointRef.current.loadDefaultImg();
            svgHotPointRef.current.loadSVG('/images/A-0001.svg');
        }
    }

    function rebuildCodes(codes) {
        let result = {};

        codes.forEach((item, index) => {
            const key = 's_' + (index + 1);
            result[key] = item;
        });

        return result;
    }

    function selectCalloutHandler(callout) {
        dispatch(usageCreator.setActiveCallout(callout));
    }

    function handleSelectParts(callout) {
        svgHotPointRef.current.activeCallout([callout]);
    }

    return (
        <>
            <div className={cls(['inner-container', styles.container])}>
                <Groups onClickTreeNode={showParts} />
                {
                    !isShowParts && <Legends onClickImage={showParts}/>
                }

                <div className="panel panel-legend" style={{display: isShowParts ? 'flex' : 'none'}}>
                    <SvgHotPoint
                        ref={svgHotPointRef}
                        noPicPath={'/images/nopic.gif'}
                        onSelectCallout={selectCalloutHandler}
                    />
                </div>

                {
                    isShowParts &&
                    <Panel isLoading={isPartsLoading} mode={'empty'} className={'panel-part-list'}>
                        <Parts
                            data={parts.usages}
                            activeCallout={activeCallout}
                            onSelectParts={handleSelectParts}
                        />
                    </Panel>
                }
            </div>
        </>
    );
}
