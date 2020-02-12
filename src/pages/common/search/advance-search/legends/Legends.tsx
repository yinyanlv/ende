import React from 'react';
import {Pagination} from 'antd';

export function Legends() {
    return (
        <div className="legends-container">
            <div className="legends">
                <div className="item">
                    <div className="image-box"><img src={'/images/logo.png'} alt="logo"/></div>
                    <ul>
                        <li>
                            <span className="btn">3444322</span> - <span>图例名称</span>
                            <span>-<span>图例备注</span></span>
                        </li>
                        <li>ccccc - 名称</li>
                        <li>ccccc - 名称</li>
                    </ul>
                </div>
            </div>
            <div>
                <Pagination size="small" total={50} showSizeChanger showQuickJumper/>
            </div>
        </div>
    );
}
