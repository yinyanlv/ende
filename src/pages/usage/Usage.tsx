import React, {useEffect, useRef, Ref} from 'react';
import classnames from 'classnames';
import {Tree, Table} from 'antd';
import {SvgHotPoint} from '@/components/svg-hot-point';
import styles from './usage.module.scss';

const TreeNode = Tree.TreeNode;

export function PageUsage() {
    const svgHotPointRef: Ref<SvgHotPoint> | null = useRef(null);

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

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: 150,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            width: 150,
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];

    const data: any = [];
    for (let i = 0; i < 30; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }

    return (
        <>
            <div className={classnames(['inner-container', styles.container])}>
                <div className="panel panel-tree">
                    <div className="panel-header">
                        组别
                    </div>
                    <div className="panel-content">
                        <Tree showLine defaultExpandedKeys={['0-0-0']} onSelect={onSelect}>
                            <TreeNode title="parent 1" key="0-0">
                                <TreeNode title="parent 1-0" key="0-0-0">
                                    <TreeNode title="leaf" key="0-0-0-0" />
                                    <TreeNode title="leaf" key="0-0-0-1" />
                                    <TreeNode title="leaf" key="0-0-0-2" />
                                </TreeNode>
                                <TreeNode title="parent 1-1" key="0-0-1">
                                    <TreeNode title="leaf" key="0-0-1-0" />
                                </TreeNode>
                                <TreeNode title="parent 1-2" key="0-0-2">
                                    <TreeNode title="leaf" key="0-0-2-0" />
                                    <TreeNode title="leaf" key="0-0-2-1" />
                                </TreeNode>
                            </TreeNode>
                        </Tree>
                    </div>
                </div>

                <div className="panel panel-legend">
                    <SvgHotPoint ref={svgHotPointRef} onLegendLoaded={legendLoadedHandler} onSelectCallout={selectCalloutHandler} />
                </div>


                <div className="panel panel-part-list">
                    <Table columns={columns} dataSource={data} size={'small'} scroll={{ y: styles.partsTableBodyHeight}} pagination={false} />
                </div>
            </div>
        </>
    );
}
