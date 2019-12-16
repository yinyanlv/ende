import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cls from 'classnames';
import {updateLocationSearch, getCleanQueryObj} from '@/common/utils';
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
        isShowParts
    } = useSelector((state: any) => {
        return state.usage;
    });

    useEffect(() => {
        const queryObj = getCleanQueryObj();
        dispatch(groupsCreator.load(queryObj));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);


    function handleClickTreeNode(params) {
        showParts(params);
    }

    function handleSelectParts(callout) {
        dispatch(usageCreator.setActiveCallout(callout));
    }

    function handleClickImage(params) {
        showParts(params);
    }

    function showParts(params) {
        const queryObj = getCleanQueryObj();
        const codes = params.codePathList;
        const codesMap = rebuildCodes(codes);

        dispatch(usageCreator.setIsShowParts(true));
        dispatch(groupsCreator.setActiveTreeNodeCode(params.code));
        dispatch(legendCreator.setSvgUrl(params.svgUri));

        const temp = Object.assign({}, queryObj, codesMap);
        dispatch(partsCreator.load(temp));
        dispatch(crumbsCreator.load(temp));
        updateLocationSearch(temp);
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
                <Groups onClickTreeNode={handleClickTreeNode} />
                <Legend isShow={isShowParts} activeCallout={activeCallout} />

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
