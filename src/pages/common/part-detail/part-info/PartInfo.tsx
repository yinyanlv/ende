import React from 'react';
import {ImageGallery} from '@/components/image-gallery';
import {Button} from 'antd';


export function PartInfo() {
    return (
        <>
            <div className="magnifier-box">
                <ImageGallery items={[{
                    thumbnail: '/images/parts/part_1_small.jpg',
                    original: '/images/parts/part_1_large.jpg'
                }, {
                    thumbnail: '/images/parts/part_2_small.jpg',
                    original: '/images/parts/part_2_large.jpg'
                }, {
                    thumbnail: '/images/parts/part_3_small.jpg',
                    original: '/images/parts/part_3_large.jpg'
                }, {
                    thumbnail: '/images/parts/part_1_small.jpg',
                    original: '/images/parts/part_1_large.jpg'
                }]}/>
            </div>
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td>零件编号:</td>
                        <td>零件编号:</td>
                    </tr>
                    <tr>
                        <td>零件名称:</td>
                        <td>零件编号:</td>
                    </tr>
                    <tr>
                        <td>最小包装数:</td>
                        <td>零件编号:</td>
                    </tr>
                    <tr>
                        <td>库位:</td>
                        <td>零件编号:</td>
                    </tr>
                    <tr>
                        <td>运输方式:</td>
                        <td>零件编号:</td>
                    </tr>
                    <tr>
                        <td>备注:</td>
                        <td>零件编号:</td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <div><span>$1200</span></div>
                    <div><Button type="primary">购买</Button></div>
                </div>
            </div>
        </>
    );
}
