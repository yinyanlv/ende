import React from 'react';
import {useDispatch} from 'react-redux';
import {Input} from 'antd';
import {searchCreator} from '@/pages/common/search/actions';
import {advanceSearchCreator} from '@/pages/common/search/advance-search/actions';
import styles from './VinSearch.module.scss';
import {vinSearchCreator} from './actions';
import {queryCreator} from '@/pages/common/search/advance-search/query/actions';
import {useUtils} from '@/hooks';

const AntdSearch = Input.Search;

interface VinSearchProps {
}

enum SearchType {
    VIN,
    VSN,
    PART_CODE,
    PART_NAME
}

export function VinSearch(props: VinSearchProps) {
    const dispatch = useDispatch();
    const utils = useUtils();

    function doVinSearch(val: string) {
        val = val.trim();
        if (val === '') {
            dispatch(searchCreator.setIsShowSearch({
                isShow: true
            }));
            return;
        }
        const searchType = getSearchType(val);

        dispatch(queryCreator.setIsShowBtnDetail({
            isShowBtnDetail: false
        }));
        dispatch(searchCreator.setActiveTab({
            activeTab: 'advance-search'
        }));
        dispatch(advanceSearchCreator.setActiveTab({
            activeTab: 'applicability'
        }));
        switch (searchType) {
            case SearchType.VIN:
                dispatch(vinSearchCreator.doVinSearch({
                    code: val
                }));
                break;
            case SearchType.VSN:
                dispatch(vinSearchCreator.doVsnSelectModel({
                    code: val
                }));
                break;
            case SearchType.PART_CODE:
                dispatch(searchCreator.queryAndShowSearch({
                    partCode: val,
                    activeTab: 'advance-search'
                }));
                break;
            case SearchType.PART_NAME:
                dispatch(searchCreator.queryAndShowSearch({
                    partName: val,
                    activeTab: 'advance-search'
                }));
                break;
            default:
        }
    }

    function getSearchType(val): SearchType {
        // vin查询，包含lzw或mk3,不包含中文就查询vin
        if (/^.*(lzw|mk3|lk6).*$/i.test(val) && !/[\u4e00-\u9fa5]+/.test(val)) {
            return SearchType.VIN;
        } else if (/^[A-Za-z0-9]{14,15}$/.test(val)) {
            // vsn查询，14/15 and 字母+数字查询vsn
            return SearchType.VSN;
        } else if (/^(\w|-|\+|\/)+$/ig.test(val)) {
            // 零件号查询，字母+数字 or 包含-+/查询零件。英文状态下，非vin查询、vsn查询，则进入零件号查询
            return SearchType.PART_CODE;
        } else {
            // 零件名称查询
            return SearchType.PART_NAME;
        }
    }

    return (
        <div className={styles.operatorBox}>
            <div className="item item-search">
                <AntdSearch placeholder={utils.getText('search.a2')} onSearch={doVinSearch}/>
            </div>
        </div>
    );
}
