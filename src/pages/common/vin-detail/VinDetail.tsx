import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Drawer, Button} from 'antd';
import {vinDetailCreator} from './actions'

export function VinDetail(props) {

    const dispatch = useDispatch();
    const vinDetail = useSelector((state: any) => {
        return state.vinDetail;
    });

    function handleClose() {
        dispatch(vinDetailCreator.setIsShowVinDetail({
            isShow: false
        }));
    }

    return (
        <Drawer
            closable={false}
            visible={vinDetail.isShow}
            onClose={handleClose}
        >
           <div className="vinDetailContainer">
               <div>
                   VIN详情
               </div>
               <div>
                   <table>
                       <tbody>
                       <tr>
                           <td>品种代码:</td>
                           <td>品种代码</td>
                       </tr>
                       <tr>
                           <td>车辆型号:</td>
                           <td>品种代码</td>
                       </tr>
                       <tr>
                           <td>车型:</td>
                           <td>品种代码</td>
                       </tr>
                       <tr>
                           <td>车型平台:</td>
                           <td>品种代码</td>
                       </tr>
                       <tr>
                           <td>发动机代码:</td>
                           <td>品种代码</td>
                       </tr>
                       <tr>
                           <td>发动机名称:</td>
                           <td>品种代码</td>
                       </tr>
                       <tr>
                           <td>排量:</td>
                           <td>品种代码</td>
                       </tr>
                       <tr>
                           <td>功率:</td>
                           <td>品种代码</td>
                       </tr>
                       <tr>
                           <td>生产厂家:</td>
                           <td>品种代码</td>
                       </tr>
                       <tr>
                           <td>生产日期:</td>
                           <td>品种代码</td>
                       </tr>
                       <tr>
                           <td>备注:</td>
                           <td>品种代码</td>
                       </tr>
                       <tr>
                           <td>变速器:</td>
                           <td>品种代码</td>
                       </tr>
                       <tr>
                           <td>面漆颜色:</td>
                           <td>品种代码</td>
                       </tr>
                       <tr>
                           <td>空调:</td>
                           <td>品种代码</td>
                       </tr>
                       <tr>
                           <td>批次号:</td>
                           <td>品种代码</td>
                       </tr>
                       <tr>
                           <td>识别码:</td>
                           <td>品种代码</td>
                       </tr>
                       </tbody>
                   </table>
               </div>
               <div>
                   <Button type="primary">打开高级查询</Button>
               </div>
           </div>
        </Drawer>
    );
}
