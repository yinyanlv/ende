import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cls from 'classnames';
import {updateLocationSearch, updateLocationHash, getMQueryObj, getHashObj} from '@/common/utils';
import {crumbsCreator} from '@/pages/common/crumbs/actions';
import {usageCreator} from './actions';
import {legendCreator} from '@/pages/usage/legend/actions';
import {partsCreator} from '@/pages/usage/parts/actions';
import {groupsCreator} from './groups/actions';
import {Groups} from './groups';
import {Legends} from './legends';
import {Legend} from './legend';
import {Parts} from './parts';
import styles from './usage.module.scss';

export function PageUsage() {
    const dispatch = useDispatch();
    const {
        isFirstLoad,
        isShowGroups,
        isShowLegendParts,
        isShowParts,
        activeCallout,
    } = useSelector((state: any) => {
        return state.usage;
    });

    useEffect(() => {

        const hashObj = getHashObj();

        if (hashObj && hashObj.callout) {
            dispatch(usageCreator.setActiveCallout(hashObj.callout));
        }

        dispatch(groupsCreator.load());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    function handleClickTreeNode(params) {
        loadParts(params);
    }

    function handleClickImage(params) {
        loadParts(params);
    }

    function handleSelectParts(callout) {
        updateCallout(callout);
    }

    function handleSelectCallout(callout) {
        updateCallout(callout);
    }

    function updateCallout(callout) {
        dispatch(usageCreator.setActiveCallout(callout));
        updateLocationHash({
            callout
        });
    }

    function loadParts(params) {
        const queryObj = getMQueryObj();
        const codes = params.codePathList;
        const codesMap = rebuildCodes(codes);

        dispatch(usageCreator.setIsShowLegendParts(true));
        dispatch(groupsCreator.setActiveTreeNodeCode(params.code));
        dispatch(legendCreator.setSvgUrl(params.svgUri));

        const temp = Object.assign({}, queryObj, codesMap);
        dispatch(partsCreator.load(temp));
        dispatch(crumbsCreator.load(temp));
        debugger;
        updateLocationSearch(temp);

        if (isFirstLoad) {
            dispatch(usageCreator.setIsFirstLoad(false));
        } else {
            updateLocationHash();
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

    function showGroups() {
        dispatch(usageCreator.setIsShowGroups(true));
    }

    function hideGroups() {
        dispatch(usageCreator.setIsShowGroups(false));
    }

    function showParts() {
        dispatch(usageCreator.setIsShowParts(true));
    }

    function hideParts() {
        dispatch(usageCreator.setIsShowParts(false));
    }

    return (
        <>
            <div className={cls(['inner-container', styles.container])}>
                <Groups onClickTreeNode={handleClickTreeNode} isFirstLoad={isFirstLoad} isShowGroups={isShowGroups} />
                <Legend
                    isShowLegend={isShowLegendParts}
                    isShowGroups={isShowGroups}
                    activeCallout={activeCallout}
                    onSelectCallout={handleSelectCallout}
                    onClickLeftArrow={hideGroups}
                    onClickRightArrow={showGroups}
                />
                {
                    isShowLegendParts &&
                    <Parts
                        isShowParts={isShowParts}
                        activeCallout={activeCallout}
                        onSelectParts={handleSelectParts}
                        onClickLeftArrow={showParts}
                        onClickRightArrow={hideParts}
                    />
                }

                {
                    !isShowLegendParts &&
                    <Legends
                        isShowGroups={isShowGroups}
                        onClickImage={handleClickImage}
                        onClickLeftArrow={hideGroups}
                        onClickRightArrow={showGroups}
                    />
                }
            </div>
        </>
    );
}
