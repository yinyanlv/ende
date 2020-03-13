import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'antd';
import {ShoppingCartOutlined} from '@ant-design/icons';
import {shoppingCartCreator} from '@/pages/common/shopping-cart/actions';
import {ImageGallery} from '@/components/image-gallery';
import styles from './PartInfo.module.scss';
import {configCreator} from '@/store/config/actions';

export function PartInfo() {
    const dispatch = useDispatch();
    const {info} = useSelector((state: any) => {
        return state.partDetail.partInfo;
    });
    const {maxZIndex} = useSelector((state: any) => {
        return state.config;
    });
    const {
        resHost
    } = useSelector((state: any) => {
        return state.config;
    });

    function handleClickBuy(e, partCode) {
        e.stopPropagation();
        const newMaxZIndex = maxZIndex + 5;
        dispatch(shoppingCartCreator.addAndShowShoppingCart({
            partCode: partCode,
            zIndex: newMaxZIndex
        }));
        dispatch(configCreator.setMaxZIndex({
            maxZIndex: newMaxZIndex
        }));
    }

    const imageList = getImageList(info.imageUris);

    function getImageList(list) {
        if (!list) {
            return [];
        }

        return list.map((item) => {
            return {
                thumbnail: resHost + item.fileUri,
                original: resHost + item.fileUri
            }
        });
    }

    return (
        <div className={styles.partInfo}>
            <div className="magnifier-box">
                <ImageGallery items={imageList}/>
            </div>
            <div className="info-box">
                <table>
                    <tbody>
                    <tr>
                        <td>零件编号:</td>
                        <td>{info.code}</td>
                    </tr>
                    <tr>
                        <td>零件名称:</td>
                        <td>{info.name}</td>
                    </tr>
                    <tr>
                        <td>最小包装数:</td>
                        <td>{info.unitPkgQty}</td>
                    </tr>
                    <tr>
                        <td>库位:</td>
                        <td>{info.position}</td>
                    </tr>
                    <tr>
                        <td>运输方式:</td>
                        <td>{info.transportRestrict}</td>
                    </tr>
                    <tr>
                        <td>备注:</td>
                        <td>{info.note}</td>
                    </tr>
                    <tr>
                        <td>价格:</td>
                        <td>{info.saleProps && info.saleProps.price && info.saleProps.price.formatString}</td>
                    </tr>
                    </tbody>
                </table>
                {
                    <div className="btn-line">
                        <Button disabled={!(info.salesProps && info.saleProps.canSale)} type="primary" size={'large'}
                                icon={<ShoppingCartOutlined/>} onClick={(e) => {
                            handleClickBuy(e, info.code);
                        }}>购买</Button>
                    </div>
                }
            </div>
        </div>
    );
}
