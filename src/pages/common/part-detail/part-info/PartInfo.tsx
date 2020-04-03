import React from 'react';
import {useSelector} from 'react-redux';
import {Button, Tooltip} from 'antd';
import {ShoppingCartOutlined} from '@ant-design/icons';
import {ImageGallery} from '@/components/image-gallery';
import styles from './PartInfo.module.scss';
import {useUtils} from '@/hooks';
import {Buy} from '@/pages/common/buy';

export function PartInfo() {
    const {info} = useSelector((state: any) => {
        return state.partDetail.partInfo;
    });
    const utils = useUtils();
    const {
        resHost
    } = useSelector((state: any) => {
        return state.config;
    });

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
                        <td>
                            {info.code}
                            {
                                info.cart && <Tooltip title={utils.getText('cart.a7')}>
                                                        <span className={'label-cart'}>
                                                        <i className={'iconfont icon-add-cart'}/>
                                                        </span>
                                </Tooltip>
                            }
                        </td>
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
                <div className="btn-line">
                    <Buy partCode={info.code} placement={'left'}>
                        <Button type="primary" size={'large'}
                                icon={<ShoppingCartOutlined/>}>{utils.getText('operate.a4')}</Button>
                    </Buy>
                </div>
            </div>
        </div>
    );
}
