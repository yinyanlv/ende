import React from 'react';
import {useSelector} from 'react-redux';
import Img from 'react-image';
import {Icon} from 'antd';
import {Panel} from '@/components/panel';
import styles from  './Legends.module.scss';

const imageSuffix = '?/d/300';

interface LegendsProps {
    isShowGroups: boolean;
    onClickImage: Function;
    onClickLeftArrow?: Function;
    onClickRightArrow?: Function;
}

function Legends(props: LegendsProps) {
    const {
        isLegendsLoading,
        legends
    } = useSelector((state: any) => {
        return state.legends;
    });
    const {
        resHost
    } = useSelector((state: any) => {
        return state.config;
    });

    function handleClickLegend(params) {
        props.onClickImage(params);
    }

    function handleClickLeftArrow() {
        props.onClickLeftArrow && props.onClickLeftArrow();
    }

    function handleClickRightArrow() {
        props.onClickRightArrow && props.onClickRightArrow();
    }

    return (
        <div className={styles.legends}>
            <Panel isLoading={isLegendsLoading} className={'panel-legend-list'} title={'图例'}>
                <ul className="legend-list">
                    {
                        legends && legends.map((item) => {
                            return (
                                <li className="item"
                                    key={item.code}
                                    onClick={handleClickLegend.bind(null, {
                                        code: item.code,
                                        codePathList: item.parentIds,
                                        svgUri: item.svgFileUri
                                    })}>
                                                <span className="image-wrapper">
                                                    <Img
                                                        src={[resHost + item.imageFileUri + imageSuffix, '/images/nopic.gif']}
                                                        alt={item.text}
                                                    />
                                                </span>
                                    <span className="text">{item.code} - {item.text}</span>
                                </li>
                            );
                        })
                    }
                </ul>
            </Panel>
            {
                props.isShowGroups ? (
                    <span className="btn-arrow left-arrow" onClick={handleClickLeftArrow}><Icon type="left" /></span>
                ) : (
                    <span className="btn-arrow right-arrow" onClick={handleClickRightArrow}><Icon type="right" /></span>
                )
            }
        </div>
    );
}

export default React.memo(Legends);
