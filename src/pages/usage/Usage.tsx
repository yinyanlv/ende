import React, {useEffect, useRef, Ref, useState} from 'react';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {Tree, Table, Icon, Button} from 'antd';
import {Panel} from '@/components/panel';
import {SvgHotPoint} from '@/components/svg-hot-point';
import styles from './usage.module.scss';
import {Loading} from "@/components/loading";

const TreeNode = Tree.TreeNode;

export function PageUsage() {
    const svgHotPointRef: Ref<SvgHotPoint> | null = useRef(null);
    const [isShowLegend, setIsShowLegend] = useState(false);

    useEffect(() => {
        if (svgHotPointRef && svgHotPointRef.current) {
            svgHotPointRef.current.loadSVG('/images/A-0001.svg');
        }
    });

    function legendLoadedHandler() {
        console.log('onLegendLoaded');
    }

    function selectCalloutHandler(callout) {
        console.log(callout);
    }

    function onSelect() {

    }

    const columns = [{
        title: '#',
        dataIndex: 'callout',
        width: 40,
    }, {
        title: '零件编号',
        dataIndex: 'partNumber',
        width: 100,
        render: (text, record) => (
            <span>
            <Link to='/part/111111'>{text}</Link>
            </span>
        )
    }, {
        title: '左右',
        dataIndex: 'age',
        width: 50
    }, {
        title: '名称描述',
        dataIndex: 'name'
    }, {
        title: '年',
        dataIndex: 'year',
        width: 60
    }, {
        title: '用途',
        dataIndex: 'usage'
    }, {
        title: '量',
        dataIndex: 'count',
        width: 40
    }, {
        title: '操作',
        dataIndex: '',
        width: 80,
        render: (text, record) => (
            <span>
            <Button>购买</Button>
            </span>
        )
    }];

    const data: any = [];
    for (let i = 0; i < 30; i++) {
        data.push({
            key: i,
            callout: i,
            name: `凸轮轴轴承盖螺栓`,
            year: 2018,
            age: 32,
            count: 121,
            partNumber: 23864864,
            usage: `(DB)(DC)(DD) 36 (LJO M2P)`,
        });
    }

    return (
        <>
            <div className={classnames(['inner-container', styles.container])}>

                <Panel isLoading={false} title={'组别'} className={'panel-tree'}>
                    <Tree showLine defaultExpandedKeys={['0-0-0']} onSelect={onSelect} style={{width: '238px'}} onClick={()=> {
                        setIsShowLegend(false)
                    }}>
                        <TreeNode title="00 - 发动机-发动机装配-离合器" key="0-0">
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="0-0-1"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="0-0-2"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="0-0-3"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="0-0-4"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="0-0-5"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="0-0-6"></TreeNode>
                        </TreeNode>
                        <TreeNode title="00 - 发动机-发动机装配-离合器" key="1-0">
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="1-0-1"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="1-0-2"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="1-0-3"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="1-0-4"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="1-0-5"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="1-0-6"></TreeNode>
                        </TreeNode>
                        <TreeNode title="00 - 发动机-发动机装配-离合器" key="2-0">
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="2-0-1"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="2-0-2"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="2-0-3"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="2-0-4"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="2-0-5"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="2-0-6"></TreeNode>
                        </TreeNode>
                        <TreeNode title="00 - 发动机-发动机装配-离合器" key="3-0">
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="3-0-1"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="3-0-2"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="3-0-3"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="3-0-4"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="3-0-5"></TreeNode>
                            <TreeNode title="BQ00-001 - 发动机总成(N15T)" key="3-0-6"></TreeNode>
                        </TreeNode>
                    </Tree>
                </Panel>
                <div className="panel panel-legend-list" style={{display: isShowLegend ? 'none' : 'flex'}}>
                    <div className="panel-content">
                        <ul className="legend-list">
                            <li className="item" onClick={() => {
                                setIsShowLegend(true);
                            }}>
                                <span className="image-wrapper"><img src={'/images/legend_1.gif'}/></span>
                                <span className="text">CN150M - 五菱宏光PLUS</span>
                            </li>
                            <li className="item" onClick={() => {
                                setIsShowLegend(true);
                            }}>
                                <span className="image-wrapper"><img src={'/images/legend_1.gif'}/></span>
                                <span className="text">CN150M - 五菱宏光PLUS</span>
                            </li>
                            <li className="item" onClick={() => {
                                setIsShowLegend(true);
                            }}>
                                <span className="image-wrapper"><img src={'/images/legend_1.gif'}/></span>
                                <span className="text">CN150M - 五菱宏光PLUS</span>
                            </li>
                            <li className="item" onClick={() => {
                                setIsShowLegend(true);
                            }}>
                                <span className="image-wrapper"><img src={'/images/legend_1.gif'}/></span>
                                <span className="text">CN150M - 五菱宏光PLUS</span>
                            </li>
                            <li className="item" onClick={() => {
                                setIsShowLegend(true);
                            }}>
                                <span className="image-wrapper"><img src={'/images/legend_1.gif'}/></span>
                                <span className="text">CN150M - 五菱宏光PLUS</span>
                            </li>
                            <li className="item" onClick={() => {
                                setIsShowLegend(true);
                            }}>
                                <span className="image-wrapper"><img src={'/images/legend_1.gif'}/></span>
                                <span className="text">CN150M - 五菱宏光PLUS</span>
                            </li>
                            <li className="item" onClick={() => {
                                setIsShowLegend(true);
                            }}>
                                <span className="image-wrapper"><img src={'/images/legend_1.gif'}/></span>
                                <span className="text">CN150M - 五菱宏光PLUS</span>
                            </li>
                            <li className="item" onClick={() => {
                                setIsShowLegend(true);
                            }}>
                                <span className="image-wrapper"><img src={'/images/legend_1.gif'}/></span>
                                <span className="text">CN150M - 五菱宏光PLUS</span>
                            </li>
                            <li className="item" onClick={() => {
                                setIsShowLegend(true);
                            }}>
                                <span className="image-wrapper"><img src={'/images/legend_1.gif'}/></span>
                                <span className="text">CN150M - 五菱宏光PLUS</span>
                            </li>
                            <li className="item" onClick={() => {
                                setIsShowLegend(true);
                            }}>
                                <span className="image-wrapper"><img src={'/images/legend_1.gif'}/></span>
                                <span className="text">CN150M - 五菱宏光PLUS</span>
                            </li>
                            <li className="item" onClick={() => {
                                setIsShowLegend(true);
                            }}>
                                <span className="image-wrapper"><img src={'/images/legend_1.gif'}/></span>
                                <span className="text">CN150M - 五菱宏光PLUS</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="panel panel-legend" style={{display: isShowLegend ? 'flex' : 'none'}}>
                    <SvgHotPoint ref={svgHotPointRef} onLegendLoaded={legendLoadedHandler}
                                 onSelectCallout={selectCalloutHandler}/>
                </div>

                <div className="panel panel-part-list" style={{display: isShowLegend ? 'flex' : 'none'}}>
                    <Table columns={columns} dataSource={data} size={'small'} scroll={{y: styles.partsTableBodyHeight}}
                           pagination={false}/>
                </div>
            </div>
        </>
    );
}
