import React from 'react';
import {useSelector} from 'react-redux';
import styles from './Bulletin.module.scss';

export function Bulletin() {

    const {list} = useSelector((state: any) => {
        return state.partDetail.bulletin;
    });

    return (
        <div className={styles.bulletin}>
            {
                list && list.map((item) => {
                    return (
                        <div className="item">
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
                })
            }
        </div>
    );
}
