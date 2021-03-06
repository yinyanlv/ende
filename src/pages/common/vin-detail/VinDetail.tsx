import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Drawer, Button} from 'antd';
import {isAtPateUsage} from '@/common/utils';
import {searchCreator} from '@/pages/common/search/actions';
import {queryCreator} from '@/pages/common/search/advance-search/query/actions';
import {vinDetailCreator} from './actions';
import styles from './VinDetail.module.scss';
import {configCreator} from '@/store/config/actions';
import {useUtils} from '@/hooks';
import history from '@/common/history';
import queryString from 'query-string';
import {usageCreator} from '@/pages/usage/actions';

export function VinDetail(props) {

    const dispatch = useDispatch();
    const {data, isShow, zIndex, type} = useSelector((state: any) => {
        return state.vinDetail;
    });
    const isSearchShow = useSelector((state: any) => {
        return state.search.self.isShow;
    });
    const {maxZIndex} = useSelector((state: any) => {
        return state.config;
    });
    const utils = useUtils();

    function handleClose() {
        dispatch(vinDetailCreator.setIsShowVinDetail({
            isShow: false
        }));
    }

    function doAdvanceQuery() {
        const mappings = data.mappings;
        const newMaxZIndex = maxZIndex + 5;
        dispatch(vinDetailCreator.setIsShowVinDetail({
            isShow: false
        }));
        if (type === 'vin') {
            dispatch(searchCreator.queryAndShowSearch({
                vinVsn: data.code,
                zIndex: newMaxZIndex,
                activeTab: 'advance-search'
            }));
        } else {
            dispatch(searchCreator.queryAndShowSearch({
                vinVsn: data.code,
                vsnModel: mappings.m_4,
                zIndex: newMaxZIndex,
                activeTab: 'advance-search'
            }));
        }
        dispatch(configCreator.setMaxZIndex({
            maxZIndex: newMaxZIndex
        }));
        dispatch(queryCreator.setIsShowBtnDetail({
            isShowBtnDetail: true
        }));
    }

    function vinLegend() {
        const mappings = Object.assign({}, data.mappings, {
            type,
            code: data.code
        });
        const isNeedManualRefresh = isAtPateUsage();
        history.push({
            pathname: '/usage',
            search: queryString.stringify(mappings)
        });
        if (isNeedManualRefresh) {
            dispatch(usageCreator.initUsage());
        }
        dispatch(vinDetailCreator.setIsShowVinDetail({
            isShow: false
        }));
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
                   <div className={'btns'}>
                       <Button type="primary" onClick={vinLegend}>{utils.getText('vin.a19')}</Button>
                       {
                           !isSearchShow && <Button type="primary" onClick={doAdvanceQuery}>{utils.getText('vin.a4')}</Button>
                       }
                   </div>
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
                       <tr>
                           <td>{utils.getText('vin.a18')}:</td>
                           <td>{data.proDate}</td>
                       </tr>
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
