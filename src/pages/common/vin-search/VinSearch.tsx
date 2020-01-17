import React from 'react';
import {useDispatch} from 'react-redux';
import {Button, Dropdown, Input, Menu, message} from 'antd';
import styles from './VinSearch.module.scss';
import {vinDetailCreator} from '@/pages/common/vin-detail/actions'

const MenuItem = Menu.Item;
const AntdSearch = Input.Search;

interface VinSearchProps {
}

type searchType = 'vin' | 'vsn' | 'part-code' | 'part-name';

export function VinSearch(props: VinSearchProps) {
    const dispatch = useDispatch();

    function doVinSearch(value: string) {
        value = value.trim();
        if (value === '') {
            message.error('请输入查询所需的关键字');
            return;
        }
        dispatch(vinDetailCreator.setIsShowVinDetail({
            isShow: true
        }));
    }

    function selectSearchType(val) {
        // vin查询，包含lzw或mk3,不包含中文就查询vin
        if (/^.*(lzw|mk3|lk6).*$/i.test(val) && !/[\u4e00-\u9fa5]+/.test(val)) {

        } else if (/^[A-Za-z0-9]{14,15}$/.test(val)) {
            // vsn查询，14/15 and 字母+数字查询vsn
        } else if (/^(\w|-|\+|\/)+$/ig.test(val)) {
            // 零件号查询，字母+数字 or 包含-+/查询零件。英文状态下，非vin查询、vsn查询，则进入零件号查询
        } else {
            // 零件名称查询
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
