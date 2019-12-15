import React, {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cls from 'classnames';
import {updateLocationSearch, getCleanQueryObj} from '@/common/utils';
import {Panel} from '@/components/panel';
import {crumbsCreator} from '@/pages/common/crumbs/actions';
import {groupsCreator} from './groups/actions';
import {legendCreator} from './legend/actions';
import {partsCreator, usageCreator} from './actions';
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

        dispatch(usageCreator.setIsShowParts(true));
        dispatch(groupsCreator.setActiveTreeNodeCode(params.code));
        dispatch(legendCreator.setSvgUrl(params.svgUri));

        const temp = Object.assign({}, queryObj, codesMap);
        dispatch(partsCreator.load(temp));
        dispatch(crumbsCreator.load(temp));
        updateLocationSearch(temp);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function rebuildCodes(codes) {
        let result = {};

        codes.forEach((item, index) => {
            const key = 's_' + (index + 1);
            result[key] = item;
        });

        return result;
    }

    function handleSelectParts(callout) {
       dispatch(usageCreator.setActiveCallout(callout));
    }

    return (
        <>
            <div className={cls(['inner-container', styles.container])}>
                <Groups onClickTreeNode={showParts} />
                <Legend isShow={isShowParts} activeCallout={activeCallout} />

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

                {
                    !isShowParts && <Legends onClickImage={showParts}/>
                }
            </div>
        </>
    );
}
