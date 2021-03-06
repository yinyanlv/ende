import React from 'react';
import {useSelector} from 'react-redux';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import {Panel} from '@/components/panel';
import styles from './Legends.module.scss';
import {useUtils} from '@/hooks';
import Img from 'react-image';

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
    const utils = useUtils();

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
            <Panel isLoading={isLegendsLoading} className={'panel-legend-list'} title={utils.getText('legend.a5')}>
                <ul className="legend-list">
                    {
                        legends && legends.map((item) => {
                            const note = item.note ? `(${item.note})` : '';
                            const title = `${item.code} - ${item.text} ${note}`;
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
                                                        src={[resHost + item.imageFileUri + imageSuffix, '/images/pure_no_legend.png']}
                                                        alt={title}
                                                    />
                                                </span>
                                    <span className="text" title={title}>{title}</span>
                                </li>
                            );
                        })
                    }
                </ul>
            </Panel>
            {
                props.isShowGroups ? (
                    <span className="btn-arrow left-arrow" onClick={handleClickLeftArrow}><LeftOutlined/></span>
                ) : (
                    <span className="btn-arrow right-arrow" onClick={handleClickRightArrow}><RightOutlined/></span>
                )
            }
        </div>
    );
}

export default React.memo(Legends);
