import React from 'react';
import {useSelector} from 'react-redux';
import Img from 'react-image';
import {Panel} from '@/components/panel';
import './Legends.module.scss';

const imageSuffix = '?/d/300';

interface LegendsProps {
    onClickImage: Function;
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
        return state.auth;
    });

    function handleClickLegend(params) {
        props.onClickImage(params);
    }

    return (
        <Panel isLoading={isLegendsLoading} mode={'empty'} className={'panel-legend-list'}>
            <div className="panel-content">
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
            </div>
        </Panel>
    );
}

export default React.memo(Legends);
