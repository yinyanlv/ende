import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Drawer, Button} from 'antd';
import {vinDetailCreator} from './actions'

export function VinDetail(props) {

    const dispatch = useDispatch();
    const vinDetail = useSelector((state: any) => {
        return state.vinDetail;
    });
    const data = vinDetail.data;

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
            destroyOnClose={true}
        >
           <div className="vinDetailContainer">
               <div className="drawer-title">
                   <span>VIN/VSN详情</span>
                   <Button type="primary">打开高级查询</Button>
               </div>
               <div>
                   <table>
                       <tbody>
                       <tr>
                           <td>VIN/VSN:</td>
                           <td>{data.code}</td>
                       </tr>
                       <tr>
                           <td>品种代码:</td>
                           <td>{data.vsnVariety && data.vsnVariety.code}</td>
                       </tr>
                       <tr>
                           <td>车辆型号:</td>
                           <td>{data.vsnVariety && data.vsnVariety.vehicleCode}</td>
                       </tr>
                       <tr>
                           <td>车型:</td>
                           <td>{data.vsnVariety && data.vsnVariety.modelName}</td>
                       </tr>
                       <tr>
                           <td>车型平台:</td>
                           <td>{data.vsnVariety && data.vsnVariety.catalogName}</td>
                       </tr>
                       <tr>
                           <td>发动机代码:</td>
                           <td>{data.vsnEngine && data.vsnEngine.code}</td>
                       </tr>
                       <tr>
                           <td>发动机名称:</td>
                           <td>{data.vsnEngine && data.vsnVariety.name}</td>
                       </tr>
                       <tr>
                           <td>排量:</td>
                           <td>{data.vsnEngine && data.vsnEngine.displacement}</td>
                       </tr>
                       <tr>
                           <td>功率:</td>
                           <td>{data.vsnEngine && data.vsnEngine.power}</td>
                       </tr>
                       <tr>
                           <td>生产厂家:</td>
                           <td>{data.vsnEngine && data.vsnEngine.manufacturerName}</td>
                       </tr>
                       {/*<tr>*/}
                       {/*    <td>生产日期:</td>*/}
                       {/*    <td>{data.vsnEngine && data.vsnEngine.manufacturerName}</td>*/}
                       {/*</tr>*/}
                       <tr>
                           <td>备注:</td>
                           <td>{data.vsnEngine && data.vsnEngine.note}</td>
                       </tr>
                       <tr>
                           <td>变速器:</td>
                           <td>{data.vsnTransmission}</td>
                       </tr>
                       <tr>
                           <td>面漆颜色:</td>
                           <td>{data.vsnColor && data.vsnColor.name}</td>
                       </tr>
                       <tr>
                           <td>空调:</td>
                           <td>{data.vsnAirCondition && data.vsnAirCondition.name}</td>
                       </tr>
                       <tr>
                           <td>批次号:</td>
                           <td>{data.vsnBatch}</td>
                       </tr>
                       <tr>
                           <td>识别码:</td>
                           <td>{data.vsnIdentifier}</td>
                       </tr>
                       </tbody>
                   </table>
               </div>
           </div>
        </Drawer>
    );
}
