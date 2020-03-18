import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Drawer, Tabs} from 'antd';
import {partDetailCreator} from './actions';
import {PartInfo} from './part-info';
import {Applicability} from './applicability';
import {Replace} from './replace';
import styles from './PartDetail.module.scss';
import {useUtils} from '@/hooks';

const TabPane = Tabs.TabPane;

export function PartDetail() {
    const dispatch = useDispatch();
    const {isShow, activeTab, partCode, zIndex} = useSelector((state: any) => {
        return state.partDetail.self;
    });
    const utils = useUtils();

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
                    <span>{utils.getText('part.a15')}</span>
                    {/*<Button type="primary">在新页面打开</Button>*/}
                </div>
                <PartInfo/>

                <div className="tabs-wrapper">
                    <Tabs
                        defaultActiveKey={activeTab}>
                        <TabPane tab={utils.getText('applicability.a1')} key="applicability">
                            <Applicability/>
                        </TabPane>
                        <TabPane tab={utils.getText('replace.a1')} key="replace">
                            <Replace partCode={partCode} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </Drawer>
    );
}
