import React from 'react';
import {Button, Pagination} from "antd";

export function Communication() {
    return (
        <div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>通讯编号:</td>
                            <td>通讯编号:</td>
                        </tr>
                        <tr>
                            <td>主题:</td>
                            <td>通讯编号:</td>
                        </tr>
                        <tr>
                            <td>车辆型号:</td>
                            <td>通讯编号:</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <Pagination size="small" total={50} showSizeChanger showQuickJumper/>
            </div>
        </div>
    );
}
