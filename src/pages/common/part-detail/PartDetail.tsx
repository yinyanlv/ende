import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Drawer, Tabs} from 'antd';
import {partDetailCreator} from './actions';
import {PartInfo} from './part-info';
import {Applicability} from './applicability';
import {Replace} from './replace';
import {Communication} from './communication';
import {Remark} from './remark';

const TabPane = Tabs.TabPane;

export function PartDetail() {
    const dispatch = useDispatch();
    const partDetail = useSelector((state: any) => {
        return state.partDetail;
    });

    function handleClose() {
        dispatch(partDetailCreator.setIsShowPartDetail({
            isShow: false
        }));
    }
    return (
        <Drawer
            closable={false}
            visible={partDetail.isShow}
            onClose={handleClose}
            width={900}
        >
            <div className="vinDetailContainer">
                <div>
                    零件详情
                    <Button type="primary">打开高级查询</Button>
                </div>
                <div>
                    <div>
                        <PartInfo/>
                    </div>
                    <div>
                        <Tabs
                            defaultActiveKey="1">
                            <TabPane tab="适用性" key="1">
                                <Applicability/>
                            </TabPane>
                            <TabPane tab="替换关系" key="2">
                                <Replace />
                            </TabPane>
                            <TabPane tab="配件通讯(2)" key="3">
                                <Communication />
                            </TabPane>
                            <TabPane tab="用户备注(2)" key="4">
                                <Remark />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Drawer>
    );
}
