import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Pagination} from 'antd';
import styles from './Legends.module.scss';
import {legendsCreator} from './actions';

export function Legends() {

    const dispatch = useDispatch();
    const {list, total, pageNo, pageSize} = useSelector((state: any) => {
        return state.search.advanceSearch.legends;
    });
    const {queryParams} = useSelector((state: any) => {
        return state.search.advanceSearch.self;
    });

    function handleClickLegend(code) {
        console.log(code);
    }

    function doQuery(page, size) {
        queryParams.paging = {
            page,
            size
        };

        dispatch(legendsCreator.doQuery(queryParams));
    }

    return (
        <div className="parts-wrapper">
            <div className={styles.legends}>
                <div className="inner-wrapper">
                    {
                        list && list.map((item) => {
                            return (
                                <div className="item" key={item.legendCode}>
                                    <div className="image-box" onClick={handleClickLegend.bind(null, item.legendCode)}><img src={item.legendFileUri || '/images/logo.png'} alt={item.name}/></div>
                                    <div className="info-box">
                                        <div className="title-line" onClick={handleClickLegend.bind(null, item.legendCode)}>
                                            <span>{item.legendCode}</span>
                                            <span className="gap">-</span>
                                            <span>{item.legendName}</span>
                                            <span className="gap">-</span>
                                            <span>{item.legendName}</span>
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
                        })
                    }
                </div>
            </div>
            <div className={styles.pagination}>
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
        </div>
    );
}
