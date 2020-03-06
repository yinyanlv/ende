import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Loading} from '@/components/loading';
import {getQueryObj} from '@/common/utils';
import styles from './PrintLegend.module.scss';
import {Table} from 'antd';
import {printLegendCreator} from './actions';

import {API_PREFIX} from '@/config';
const svgPrefix = '/res';

export function PagePrintLegend() {

    const dispatch = useDispatch();
    const {list, isLoading} = useSelector((state: any) => {
        return state.printLegend;
    });
    const queryObj: any = getQueryObj();

    useEffect(() => {
        const params = Object.assign({}, queryObj);
        delete params.src;
        dispatch(printLegendCreator.loadParts(params));
    }, []);

    const columns = [{
        title: '#',
        dataIndex: 'callout',
        width: 40,
        ellipsis: true
    }, {
        title: '零件编号',
        dataIndex: 'partCode',
        width: 150,
        ellipsis: true
    }, {
        title: '左右',
        dataIndex: 'handName',
        ellipsis: true,
        width: 80
    }, {
        title: '名称描述',
        dataIndex: 'name',
        width: 140,
        ellipsis: true
    }, {
        title: '用途',
        dataIndex: 'note',
        ellipsis: true,
        width: 140
    }, {
        title: '量',
        dataIndex: 'formattedQty',
        ellipsis: true,
        width: 40
    }];

    console.log(queryObj.src);

    return (
        <div className={styles.printLegend}>
            <div className={'image-wrapper'}>
                <img src={API_PREFIX + svgPrefix + queryObj.src} />
            </div>
            <div className={'table-wrapper'}>
                <Loading isLoading={isLoading}>
                    <Table columns={columns}
                           dataSource={list}
                           rowKey={'id'}
                           tableLayout={'fixed'}
                           pagination={false}
                    />
                </Loading>
            </div>
        </div>
    );
}