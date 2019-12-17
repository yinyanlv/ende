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
        activeCallout,
        isShowParts,
        isFirstLoad
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
        showParts(params);
    }

    function handleClickImage(params) {
        showParts(params);
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

    function showParts(params) {
        const queryObj = getMQueryObj();
        const codes = params.codePathList;
        const codesMap = rebuildCodes(codes);

        dispatch(usageCreator.setIsShowParts(true));
        dispatch(groupsCreator.setActiveTreeNodeCode(params.code));
        dispatch(legendCreator.setSvgUrl(params.svgUri));

        const temp = Object.assign({}, queryObj, codesMap);
        dispatch(partsCreator.load(temp));
        dispatch(crumbsCreator.load(temp));
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

    return (
        <>
            <div className={cls(['inner-container', styles.container])}>
                <Groups onClickTreeNode={handleClickTreeNode} isFirstLoad={isFirstLoad} />
                <Legend isShow={isShowParts} activeCallout={activeCallout} onSelectCallout={handleSelectCallout} />
                {
                    isShowParts &&  <Parts activeCallout={activeCallout} onSelectParts={handleSelectParts} />
                }

                {
                    !isShowParts && <Legends onClickImage={handleClickImage}/>
                }
            </div>
        </>
    );
}
