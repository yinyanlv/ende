import React from 'react';
import {useDispatch} from 'react-redux';
import {Button, Dropdown, Input, Menu, message} from 'antd';
import styles from './VinSearch.module.scss';
import {vinSearchCreator, VSN_SELECT_MODEL} from '@/pages/common/vin-search/actions';
import {vinDetailCreator} from '@/pages/common/vin-detail/actions';


const MenuItem = Menu.Item;
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

    function doVinSearch(val: string) {
        val = val.trim();
        if (val === '') {
            message.error('请输入查询所需的关键字');
            return;
        }
        const searchType = getSearchType(val);

        switch(searchType) {
            case SearchType.VIN:
                dispatch(vinSearchCreator.doVinSearch({
                    value: val
                }));
                break;
            case SearchType.VSN:
                dispatch(vinSearchCreator.doVsnSelectModel({
                    value: val
                }));
                break;
            case SearchType.PART_CODE:
                break;
            case SearchType.PART_NAME:
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
                <AntdSearch placeholder="请输入VIN码,VSN码,零件编号或零件描述" onSearch={doVinSearch}/>
            </div>
        </div>
    );
}
