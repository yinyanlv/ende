import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Img from 'react-image';
import {Loading} from '@/components/loading';
import {getQueryObj} from '@/common/utils';
import styles from './PrintLegend.module.scss';
import {Table} from 'antd';
import {printLegendCreator} from './actions';
import {useUtils} from '@/hooks';

export function PagePrintLegend() {

    const dispatch = useDispatch();
    const {list, isLoading} = useSelector((state: any) => {
        return state.printLegend;
    });
    const queryObj: any = getQueryObj();
    const utils = useUtils();

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
        title: utils.getText('part.a1'),
        dataIndex: 'partCode',
        width: 150,
        ellipsis: true
    }, {
        title: utils.getText('part.a8'),
        dataIndex: 'handName',
        ellipsis: true,
        width: 80
    }, {
        title: utils.getText('part.a2'),
        dataIndex: 'name',
        width: 140,
        ellipsis: true
    }, {
        title: utils.getText('part.a9'),
        dataIndex: 'note',
        ellipsis: true,
        width: 140
    }, {
        title: utils.getText('part.a10'),
        dataIndex: 'formattedQty',
        ellipsis: true,
        width: 40
    }];


    return (
        <div className={styles.printLegend}>
            <div className={'image-wrapper'}>
                <Img
                    src={[queryObj.src, '/images/nopic.gif']}
                    alt={''}
                />
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
