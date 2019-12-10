import React, {useEffect, useRef, Ref, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory, useLocation} from 'react-router-dom';
import queryString from 'query-string';
import classnames from 'classnames';
import {Tree, Table, Button} from 'antd';
import {Panel} from '@/components/panel';
import {SvgHotPoint} from '@/components/svg-hot-point';
import {groupsCreator, legendsCreator} from './actions';
import {Parts} from './parts';
import styles from './usage.module.scss';

const TreeNode = Tree.TreeNode;

export function PageUsage() {
    const svgHotPointRef: Ref<SvgHotPoint> | null = useRef(null);
    const [isShowLegend, setIsShowLegend] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const {
        groups,
        isGroupsLoading,
        activeTreeNodeCode
    } = useSelector((state: any) => {
        return state.usage;
    });
    const {
        resHost
    } = useSelector((state: any) => {
        return state.auth;
    });

    useEffect(() => {
        const queryObj = queryString.parse(location.search);
        dispatch(groupsCreator.load(queryObj));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {

    });

    function legendLoadedHandler() {
        console.log('onLegendLoaded');
    }

    function selectCalloutHandler(callout) {
        console.log(callout);
    }

    function onSelectTreeNode(codes) {
        let queryObj = queryString.parse(location.search);

        if (codes.length) {
            queryObj.s_1 = codes[0];
            dispatch(legendsCreator.load(queryObj));
        }
    }

    function renderTreeNodes(list: any) {
        return list.map(item => {
            const title = item.code + ' - ' + item.text;
            if (item.children) {
                return (
                    <TreeNode title={title} key={item.code}>
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={title} key={item.code}></TreeNode>;
        });
    }

    return (
        <>
            <div className={classnames(['inner-container', styles.container])}>
                <Panel isLoading={isGroupsLoading} title={'组别'} className={'panel-tree'}>
                    <Tree showLine
                          onSelect={onSelectTreeNode}
                          style={{width: '238px'}}
                          defaultSelectedKeys={[activeTreeNodeCode]}
                          onClick={() => {
                              setIsShowLegend(false)
                          }}
                    >
                        {
                            renderTreeNodes(groups)
                        }
                    </Tree>
                </Panel>
                <div className="panel panel-legend-list" style={{display: isShowLegend ? 'none' : 'flex'}}>
                    <div className="panel-content">
                        <ul className="legend-list">
                            <li className="item" onClick={() => {
                                setIsShowLegend(true);
                            }}>
                                <span className="image-wrapper"><img src={'/images/legend_1.gif'} alt=""/></span>
                                <span className="text">CN150M - 五菱宏光PLUS</span>
                            </li>
                            <li className="item" onClick={() => {
                                setIsShowLegend(true);
                            }}>
                                <span className="image-wrapper"><img src={'/images/legend_1.gif'} alt=""/></span>
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
                    <Parts />
                </div>
            </div>
        </>
    );
}
