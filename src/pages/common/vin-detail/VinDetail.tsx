import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Drawer, Button} from 'antd';
import {getQueryObj} from '@/common/utils';
import {searchCreator} from '@/pages/common/search/actions';
import {vinDetailCreator} from './actions';
import {vinSearchCreator} from '@/pages/common/vin-search/actions';
import styles from './VinDetail.module.scss';
import {configCreator} from '@/store/config/actions';
import {useUtils} from '@/hooks';

export function VinDetail(props) {

    const dispatch = useDispatch();
    const {data, isShow, zIndex, type} = useSelector((state: any) => {
        return state.vinDetail;
    });
    const {maxZIndex} = useSelector((state: any) => {
        return state.config;
    });
    const utils = useUtils();

    useEffect(() => {
        const queryObj = getQueryObj();
        if (queryObj.type === 'vin' && queryObj.code) {
            dispatch(vinSearchCreator.doVinSearch({
                code: queryObj.code
            }));
        } else if (queryObj.type === 'vsn' && queryObj.code && queryObj.m_4) {
            dispatch(vinSearchCreator.doVsnSearch({
                code: queryObj.code,
                model: queryObj.m_4
            }));
        }
    }, []);

    function handleClose() {
        dispatch(vinDetailCreator.setIsShowVinDetail({
            isShow: false
        }));
    }

    function doAdvanceQuery() {
        const mappings = data.mappings;
        const newMaxZIndex = maxZIndex + 5;
        if (type === 'vin') {
            dispatch(searchCreator.queryAndShowSearch({
                vinVsn: data.code,
                zIndex: newMaxZIndex
            }));
        } else {
            dispatch(searchCreator.queryAndShowSearch({
                vinVsn: data.code,
                vsnModel: mappings.m_4,
                zIndex: newMaxZIndex
            }));
        }
        dispatch(configCreator.setMaxZIndex({
            maxZIndex: newMaxZIndex
        }));
        handleClose();
    }

    return (
        <Drawer
            closable={false}
            visible={isShow}
            onClose={handleClose}
            destroyOnClose={true}
            width={500}
            zIndex={zIndex}
        >
           <div className={styles.vinDetail}>
               <div className="drawer-title">
                   <span>{utils.getText('vin.a1')}</span>
                   <Button type="primary" onClick={doAdvanceQuery}>{utils.getText('vin.a4')}</Button>
               </div>
               <div className="drawer-content table-wrapper">
                   <table>
                       <tbody>
                       <tr>
                           <td>VIN/VSN:</td>
                           <td>{data.code}</td>
                       </tr>
                       <tr>
                           <td>{utils.getText('vin.a5')}:</td>
                           <td>{data.vsnVariety && data.vsnVariety.code}</td>
                       </tr>
                       <tr>
                           <td>{utils.getText('vin.a6')}:</td>
                           <td>{data.vsnVariety && data.vsnVariety.vehicleCode}</td>
                       </tr>
                       <tr>
                           <td>{utils.getText('part.a11')}:</td>
                           <td>{data.vsnVariety && data.vsnVariety.model} - {data.vsnVariety && data.vsnVariety.modelName}</td>
                       </tr>
                       <tr>
                           <td>{utils.getText('vin.a7')}:</td>
                           <td>{data.vsnVariety && data.vsnVariety.catalog} - {data.vsnVariety && data.vsnVariety.catalogName}</td>
                       </tr>
                       <tr>
                           <td>{utils.getText('vin.a8')}:</td>
                           <td>{data.vsnEngine && data.vsnEngine.code}</td>
                       </tr>
                       <tr>
                           <td>{utils.getText('vin.a9')}:</td>
                           <td>{data.vsnEngine && data.vsnEngine.name}</td>
                       </tr>
                       <tr>
                           <td>{utils.getText('vin.a10')}:</td>
                           <td>{data.vsnEngine && data.vsnEngine.displacement}</td>
                       </tr>
                       <tr>
                           <td>{utils.getText('vin.a11')}:</td>
                           <td>{data.vsnEngine && data.vsnEngine.power}</td>
                       </tr>
                       <tr>
                           <td>{utils.getText('vin.a12')}:</td>
                           <td>{data.vsnEngine && data.vsnEngine.manufacturerName}</td>
                       </tr>
                       {/*<tr>*/}
                       {/*    <td>{utils.getText('vin.a18')}:</td>*/}
                       {/*    <td>{data.vsnEngine && data.vsnEngine.productionDate}</td>*/}
                       {/*</tr>*/}
                       <tr>
                           <td>{utils.getText('part.a14')}:</td>
                           <td>{data.vsnEngine && data.vsnEngine.note}</td>
                       </tr>
                       <tr>
                           <td>{utils.getText('vin.a13')}:</td>
                           <td>{data.vsnTransmission && data.vsnTransmission.name}</td>
                       </tr>
                       <tr>
                           <td>{utils.getText('vin.a14')}:</td>
                           <td>{data.vsnColor && data.vsnColor.name}</td>
                       </tr>
                       <tr>
                           <td>{utils.getText('vin.a15')}:</td>
                           <td>{data.vsnAirCondition && data.vsnAirCondition.name}</td>
                       </tr>
                       <tr>
                           <td>{utils.getText('vin.a16')}:</td>
                           <td>{data.vsnBatch}</td>
                       </tr>
                       <tr>
                           <td>{utils.getText('vin.a17')}:</td>
                           <td>{data.vsnIdentifier}</td>
                       </tr>
                       </tbody>
                   </table>
               </div>
           </div>
        </Drawer>
    );
}
