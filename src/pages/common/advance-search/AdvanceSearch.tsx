import React from 'react';
import {Drawer} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import styles from './AdvanceSearch.module.scss';
import {advanceSearchCreator} from './actions';

export function AdvanceSearch(props) {
    const dispatch = useDispatch();
    const advanceSearch = useSelector((state: any) => {
        return state.advanceSearch;
    });

    function handleClose() {
        dispatch(advanceSearchCreator.setIsShowAdvanceSearch({
            isShow: false
        }));
    }

    return (
        <Drawer
            title="Basic Drawer"
            placement="right"
            closable={true}
            mask={false}
            onClose={handleClose}
            visible={advanceSearch.isShow}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
    );
}
