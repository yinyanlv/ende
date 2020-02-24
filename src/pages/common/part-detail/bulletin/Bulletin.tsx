import React from 'react';
import {useSelector} from 'react-redux';
import {NoData} from '@/components/no-data';
import styles from './Bulletin.module.scss';

export function Bulletin() {

    const {list} = useSelector((state: any) => {
        return state.partDetail.bulletin;
    });

    return (
        <div className={styles.bulletin}>
            {
                list && list.length > 0 ? list.map((item) => {
                    return (
                        <div className="item" key="code">
                            <table>
                                <tbody>
                                <tr>
                                    <td>通讯编号:</td>
                                    <td>{item.code} </td>
                                </tr>
                                <tr>
                                    <td>主题:</td>
                                    <td>{item.title}</td>
                                </tr>
                                <tr>
                                    <td>车辆型号:</td>
                                    <td>{item.applicableBookDesc}</td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="date">{item.date}</div>
                        </div>
                    );
                }) :
                <NoData text={'暂无数据'} />
            }
        </div>
    );
}
