import React from 'react';
import {Button, Pagination} from 'antd';

export function Parts() {
    return (
        <div className="parts-wrapper">
            <div className="parts">
                <div className="item">
                    <div className="image-box"><img src={'/images/logo.png'} alt="logo"/></div>
                    <ul>
                        <li>
                            <span className="btn">3444322</span>-<span>零件名称</span>
                            <span>
                                (<span>零件备注</span>)
                            </span>
                        </li>
                        <li>
                            <span>
                                <label>最小包装数：</label>3
                            </span>
                            <span>
                                 <label>库位：</label>PA333
                            </span>
                            <span>
                                <label>运输方式：</label>海运
                            </span>
                            <span>
                                <label>价格：</label>海运
                            </span>
                        </li>
                    </ul>
                    <div>
                        <Button type="primary">购买</Button>
                    </div>
                </div>
            </div>
            <div>
                <Pagination size="small" total={50} showSizeChanger showQuickJumper/>
            </div>
        </div>

    );
}
