import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Pagination} from 'antd';
import {ShoppingCartOutlined} from '@ant-design/icons';
import {Loading} from '@/components/loading';
import {NoData} from '@/components/no-data';
import {partDetailCreator} from '@/pages/common/part-detail/actions';
import {shoppingCartCreator} from '@/pages/common/shopping-cart/actions';
import styles from './Parts.module.scss';
import {partsCreator} from './actions';
import {configCreator} from '@/store/config/actions';
import {useUtils} from '@/hooks';
import Img from 'react-image';

export function Parts() {
    const dispatch = useDispatch();
    const {list, total, pageNo, pageSize, isLoading} = useSelector((state: any) => {
        return state.search.advanceSearch.parts;
    });
    const {queryParams} = useSelector((state: any) => {
        return state.search.advanceSearch.self;
    });
    const {maxZIndex, resHost} = useSelector((state: any) => {
        return state.config;
    });
    const utils = useUtils();

    function handleClickPartCode(partCode) {
        const newMaxZIndex = maxZIndex + 5;
        dispatch(partDetailCreator.loadAndShowPartDetail({
            partCode,
            zIndex: newMaxZIndex
        }));
        dispatch(configCreator.setMaxZIndex({
            maxZIndex: newMaxZIndex
        }));
    }

    function handleClickBuy(partCode) {
        dispatch(shoppingCartCreator.addToCartNoQuery({
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
                                        <div className="image-box" onClick={handleClickPartCode.bind(null, item.code)}>
                                            <Img
                                                src={[resHost + item.coverImageUri, '/images/pure_no_pic.png']}
                                                alt={item.name}/>
                                        </div>
                                        <div className="info-box">
                                            <div className="title-line">
                                                <span className="text-btn"
                                                      onClick={handleClickPartCode.bind(null, item.code)}>{item.code}</span>
                                                <span className="gap">-</span>
                                                <span title={item.name}>{item.name}</span>
                                                {
                                                    item.note && <span>(<span title={item.note}>{item.note}</span>)</span>
                                                }
                                            </div>
                                            <div className="content-line">
                                                <span><label>{utils.getText('part.a3')}: </label>{item.unitPkgQty}</span>
                                                <span><label>{utils.getText('part.a4')}: </label>{item.position}</span>
                                                <span><label>{utils.getText('part.a5')}: </label>{item.transportRestrict}</span>
                                                <span><label>{utils.getText('part.a6')}: </label>{item.price}</span>
                                            </div>
                                        </div>
                                        <div className="btn-box">
                                            <Button type="primary" icon={<ShoppingCartOutlined/>}
                                                    onClick={handleClickBuy.bind(null, item.code)}>{utils.getText('operate.a4')}</Button>
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
