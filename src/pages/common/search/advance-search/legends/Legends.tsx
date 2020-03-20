import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Pagination} from 'antd';
import queryString from 'query-string';
import {NoData} from '@/components/no-data';
import history from '@/common/history';
import {usageCreator} from '@/pages/usage/actions';
import {Loading} from '@/components/loading';
import styles from './Legends.module.scss';
import {legendsCreator} from './actions';
import {getQueryObjFromRecord, isAtPateUsage} from "@/common/utils";

export function Legends() {

    const dispatch = useDispatch();
    const {list, total, pageNo, pageSize, isLoading} = useSelector((state: any) => {
        return state.search.advanceSearch.legends;
    });
    const {resHost} = useSelector((state: any) => {
        return state.config;
    });
    const {queryParams} = useSelector((state: any) => {
        return state.search.advanceSearch.self;
    });

    function handleClickLegend(record) {
        const queryObj = getQueryObjFromRecord(record);
        const isNeedManualRefresh = isAtPateUsage();
        history.push({
            pathname: '/usage',
            search: queryString.stringify(queryObj)
        });
        if (isNeedManualRefresh) {
            dispatch(usageCreator.initUsage());
        }
    }

    function doQuery(page, size) {
        queryParams.paging = {
            page,
            size
        };

        dispatch(legendsCreator.doQuery(queryParams));
    }

    return (
        <Loading isLoading={isLoading}>
            <div className={styles.legends}>
                <div className="inner-wrapper">
                    {
                        list && list.length > 0 ? list.map((item, index) => {
                                return (
                                    <div className="item" key={item.catalogueCode + item.legendCode + index}>
                                        <div className="image-box" onClick={handleClickLegend.bind(null, item)}><img
                                            src={item.legendFileUri ? resHost + item.legendFileUri : '/images/no_legend.png'} alt={item.name}/></div>
                                        <div className="info-box">
                                            <div className="title-line" onClick={handleClickLegend.bind(null, item)}>
                                                <span className={'text-btn'}>{item.legendCode}</span>
                                                <span className="gap">-</span>
                                                <span title={item.legendName}>{item.legendName}</span>
                                                {
                                                    item.legendNote && (
                                                        <>
                                                            <span className="gap">-</span>
                                                            <span title={item.legendNote}>{item.legendNote}</span>
                                                        </>
                                                    )
                                                }
                                            </div>
                                            <div className="content-line">
                                                <span>{item.catalogueCode}</span>
                                                <span className="gap">-</span>
                                                <span>{item.catalogueName}</span>
                                            </div>
                                            <div className="content-line">
                                                <span>{item.legendGroupCode}</span>
                                                <span className="gap">-</span>
                                                <span>{item.legendGroupName}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) :
                            <NoData/>
                    }
                </div>
            </div>
            <div className="pagination">
                <Pagination
                    total={total}
                    current={pageNo}
                    pageSize={pageSize}
                    pageSizeOptions={['5', '10', '20']}
                    showSizeChanger
                    showQuickJumper
                    onChange={doQuery}
                    onShowSizeChange={doQuery}
                />
            </div>
        </Loading>
    );
}
