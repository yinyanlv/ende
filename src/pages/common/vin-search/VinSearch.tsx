import React from 'react';
import {useDispatch} from 'react-redux';
import {Button, Dropdown, Input, Menu} from 'antd';
import styles from './VinSearch.module.scss';
import {vinDetailCreator} from '@/pages/common/vin-detail/actions'

const MenuItem = Menu.Item;
const AntdSearch = Input.Search;

interface VinSearchProps {
}

export function VinSearch(props: VinSearchProps) {
    const dispatch = useDispatch();

    function doVinSearch() {
        dispatch(vinDetailCreator.setIsShowVinDetail({
            isShow: true
        }));
    }

    return (
        <div className={styles.operatorBox}>
            <div className="item item-search">
                <AntdSearch placeholder="请输入VIN码,VSN码,零件编号或零件描述" onSearch={doVinSearch} />
            </div>
        </div>
    );
}
