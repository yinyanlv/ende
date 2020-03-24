import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'antd';
import {ShoppingCartOutlined} from '@ant-design/icons';
import {shoppingCartCreator} from '@/pages/common/shopping-cart/actions';
import {ImageGallery} from '@/components/image-gallery';
import styles from './PartInfo.module.scss';
import {useUtils} from '@/hooks';

export function PartInfo() {
    const dispatch = useDispatch();
    const {info} = useSelector((state: any) => {
        return state.partDetail.partInfo;
    });
    const utils = useUtils();
    const {
        resHost
    } = useSelector((state: any) => {
        return state.config;
    });

    function handleClickBuy(e, partCode) {
        e.stopPropagation();
        dispatch(shoppingCartCreator.addToCartNoQuery({
            partCode: partCode
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
                        <td>{utils.getText('part.a1')}:</td>
                        <td>{info.code}</td>
                    </tr>
                    <tr>
                        <td>{utils.getText('part.a2')}:</td>
                        <td>{info.name}</td>
                    </tr>
                    <tr>
                        <td>{utils.getText('part.a3')}:</td>
                        <td>{info.unitPkgQty}</td>
                    </tr>
                    <tr>
                        <td>{utils.getText('part.a4')}:</td>
                        <td>{info.position}</td>
                    </tr>
                    <tr>
                        <td>{utils.getText('part.a5')}:</td>
                        <td>{info.transportRestrict}</td>
                    </tr>
                    <tr>
                        <td>{utils.getText('part.a14')}:</td>
                        <td>{info.note}</td>
                    </tr>
                    <tr>
                        <td>{utils.getText('part.a6')}:</td>
                        <td>{info.saleProps && info.saleProps.price && info.saleProps.price.formatString}</td>
                    </tr>
                    </tbody>
                </table>
                {
                    <div className="btn-line">
                        <Button type="primary" size={'large'}
                                icon={<ShoppingCartOutlined/>} onClick={(e) => {
                            handleClickBuy(e, info.code);
                        }}>{utils.getText('operate.a4')}</Button>
                    </div>
                }
            </div>
        </div>
    );
}
