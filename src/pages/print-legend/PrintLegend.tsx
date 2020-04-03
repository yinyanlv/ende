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
        // fix打印
        document.documentElement.style.overflow = 'visible';
        const params = Object.assign({}, queryObj);
        delete params.src;
        dispatch(printLegendCreator.loadParts(params));
    }, []);

    const columns = [{
        title: '#',
        dataIndex: 'callout',
        width: 70
    }, {
        title: utils.getText('part.a1'),
        dataIndex: 'partCode',
        width: 150
    }, {
        title: utils.getText('part.a8'),
        dataIndex: 'handName',
        width: 80
    }, {
        title: utils.getText('part.a2'),
        dataIndex: 'name',
        width: 400
    }, {
        title: utils.getText('part.a9'),
        dataIndex: 'note',
        width: 300
    }, {
        title: utils.getText('part.a10'),
        dataIndex: 'formattedQty'
    }];

    return (
        <div className={styles.printLegend}>
            <div className={'image-wrapper'}>
                <Img
                    src={[queryObj.src, '/images/no_legend.png']}
                    alt={''}
                    onLoad={() => {
                        setTimeout(() => {
                            window.print();
                        }, 1000);
                    }}
                />
            </div>
            <div className={'table-wrapper'}>
                <Loading isLoading={isLoading}>
                    <Table columns={columns}
                           dataSource={list}
                           rowKey={'id'}
                           pagination={false}
                    />
                </Loading>
            </div>
        </div>
    );
}
