import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Drawer, Tabs} from 'antd';
import {partDetailCreator} from './actions';
import {PartInfo} from './part-info';
import {Applicability} from './applicability';
import {Replace} from './replace';
import styles from './PartDetail.module.scss';

const TabPane = Tabs.TabPane;

export function PartDetail() {
    const dispatch = useDispatch();
    const {isShow, activeTab, partCode, zIndex} = useSelector((state: any) => {
        return state.partDetail.self;
    });

    function handleClose() {
        dispatch(partDetailCreator.setIsShowPartDetail({
            isShow: false
        }));
    }

    return (
        <Drawer
            closable={false}
            visible={isShow}
            onClose={handleClose}
            width={850}
            destroyOnClose={true}
            zIndex={zIndex}
        >
            <div className={styles.partDetail}>
                <div className="drawer-title">
                    <span>零件详情</span>
                    {/*<Button type="primary">在新页面打开</Button>*/}
                </div>
                <PartInfo/>

                <div className="tabs-wrapper">
                    <Tabs
                        defaultActiveKey={activeTab}>
                        <TabPane tab="适用性" key="applicability">
                            <Applicability/>
                        </TabPane>
                        <TabPane tab="替换关系" key="replace">
                            <Replace partCode={partCode} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </Drawer>
    );
}
