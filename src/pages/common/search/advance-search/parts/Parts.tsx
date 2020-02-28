import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Pagination} from 'antd';
import {Loading} from '@/components/loading';
import {NoData} from '@/components/no-data';
import {partDetailCreator} from '@/pages/common/part-detail/actions';
import {shoppingCartCreator} from '@/pages/common/shopping-cart/actions';
import styles from './Parts.module.scss';
import {partsCreator} from './actions';

export function Parts() {
    const dispatch = useDispatch();
    const {list, total, pageNo, pageSize, isLoading} = useSelector((state: any) => {
        return state.search.advanceSearch.parts;
    });
    const {queryParams} = useSelector((state: any) => {
        return state.search.advanceSearch.self;
    });

    function handleClickPartCode(partCode) {
        dispatch(partDetailCreator.loadAndShowPartDetail({
            partCode
        }));
    }

    function handleClickBuy(partCode) {
        dispatch(shoppingCartCreator.addAndShowShoppingCart({
            partCode
        }));
    }

    function doQuery(page, size) {
        queryParams.paging = {
            page,
            size
        };

        dispatch(partsCreator.doQuery(queryParams));
    }

    return (
        <Loading isLoading={isLoading}>
            <div className={styles.parts}>
                <div className="inner-wrapper">
                    {
                        list && list.length > 0 ? list.map((item) => {
                                return (
                                    <div className="item" key={item.code}>
                                        <div className="image-box" onClick={handleClickPartCode.bind(null, item.code)}><img
                                            src={item.coverImageUri || '/images/nopic.gif'} alt={item.name}/></div>
                                        <div className="info-box">
                                            <div className="title-line">
                                                <span className="btn"
                                                      onClick={handleClickPartCode.bind(null, item.code)}>{item.code}</span>
                                                <span className="gap">-</span>
                                                <span>{item.name}</span>
                                                <span>(<span>{item.note}</span>)</span>
                                            </div>
                                            <div className="content-line">
                                                <span><label>最小包装数：</label>{item.unitPkgQty}</span>
                                                <span><label>库位：</label>{item.position}</span>
                                                <span><label>运输方式：</label>{item.transportRestrict}</span>
                                                <span><label>价格：</label>{item.price}</span>
                                            </div>
                                        </div>
                                        <div className="btn-box">
                                            <Button type="primary" icon="shopping-cart"
                                                    onClick={handleClickBuy.bind(null, item.code)}>购买</Button>
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
