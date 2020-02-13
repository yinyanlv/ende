import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'antd';
import {ImageGallery} from '@/components/image-gallery';
import styles from './PartInfo.module.scss';

export function PartInfo() {
    const dispatch = useDispatch();
    const partInfo = useSelector((state: any) => {
        return state.partDetail.partInfo;
    });

    function handleClickBuy() {

    }

    const imageList = getImageList(partInfo.imageUris);

    function getImageList(list) {
        if (!list) {
            return [];
        }

        return list.map((item) => {
            return {
                thumbnail: '/images/parts/part_1_small.jpg' || item.fileUri,
                original: '/images/parts/part_1_large.jpg' || item.fileUri
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
                        <td>{partInfo.code}</td>
                    </tr>
                    <tr>
                        <td>零件名称:</td>
                        <td>{partInfo.name}</td>
                    </tr>
                    <tr>
                        <td>最小包装数:</td>
                        <td>{partInfo.unitPkgQty}</td>
                    </tr>
                    <tr>
                        <td>库位:</td>
                        <td>{partInfo.position}</td>
                    </tr>
                    <tr>
                        <td>运输方式:</td>
                        <td>{partInfo.transportRestrict}</td>
                    </tr>
                    <tr>
                        <td>备注:</td>
                        <td>{partInfo.note}</td>
                    </tr>
                    <tr>
                        <td>价格:</td>
                        <td>{partInfo.saleProps && partInfo.saleProps.price.formatString}</td>
                    </tr>
                    </tbody>
                </table>
                {
                    partInfo.saleProps && partInfo.saleProps.canSale && (
                        <div className="btn-line">
                            <Button type="primary" size={'large'} icon={'shopping-cart'} onClick={handleClickBuy}>购买</Button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
