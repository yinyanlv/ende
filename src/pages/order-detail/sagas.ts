import {put, all, call, fork, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import history from '@/common/history';
import {buildQueryParams, rebuildFieldsToFilters} from '@/common/utils';
import * as actions from './actions';
import {infoCreator} from './info/actions';
import {cartCreator} from './cart/actions';
import {purchaserCreator} from './purchaser/actions';
import {receiverCreator} from './receiver/actions';
import {getText} from '@/pages/common/intl';
import {infoSaga} from './info/saga';
import {cartSagas} from './cart/sagas';
import {listSaga} from './list/saga';
import {editSaga} from './edit/saga';
import {importFileSaga} from './import-file/saga';
import {API_PREFIX} from '@/config';
import {crumbsCreator} from '@/pages/common/crumbs/actions';
import {storageService} from '@/common/storageService';

function* initOrderDetailController(action) {
    const orderCode = action.payload.orderCode;
    const crumbs = getCrumbs(orderCode);
    yield put(crumbsCreator.setCrumbs(crumbs));

    const filters = rebuildFieldsToFilters({
        orderCode
    });
    yield put(actions.orderDetailCreator.loadInfo({
        orderCode
    }));
    yield put(cartCreator.doQuery(buildQueryParams(filters)));
    yield put(actions.orderDetailCreator.setOrderCode({
        orderCode
    }));
}

function getCrumbs(orderCode) {
    return [{
        code: '1',
        label: null,
        name: getText('order.a1'),
        url: '/orders'
    }, {
       code: '2',
        label: getText('order.a2'),
        name: orderCode,
        url: null
    }];
}

function* loadInfoController(action) {
    try {
        const info = yield call(loadInfo, action.payload);
        yield put(actions.orderDetailCreator.setInfo(info));
        yield put(infoCreator.setFieldsValue(Object.assign({}, info)));
        yield put(purchaserCreator.setInfo(Object.assign({},info.purchaser)));
        yield put(receiverCreator.setInfo(Object.assign({},info.receiver)));
    } catch (err) {
        message.error(err.message);
    }
}

function loadInfo(params) {
    return http.get(`/order-detail?orderCode=${params.orderCode}`);
}

function* saveAsNewOrderController(action) {
    try {
        const orderCode = yield call(saveAsNewOrder, action.payload);
        history.push({
            pathname: `/order/${orderCode}`
        });
        yield put(actions.orderDetailCreator.initOrderDetail({
            orderCode
        }));
        message.success('创建成功');
    } catch (err) {
        message.error(err.message);
    }
}

function saveAsNewOrder(params) {
    return http.post(`/order/saveas`, {
       orderCode: params.orderCode
    });
}

function* deleteOrderController(action) {
    try {
        yield call(deleteOrder, action.payload);
        history.push({
            pathname: '/orders'
        });
        message.success('删除成功');
    } catch (err) {
        message.error(err.message);
    }
}

function deleteOrder(params) {
    return http.post(`/order/remove`, {
        orderCode: params.orderCode
    });
}

function* saveOrderController(action) {
    try {
        yield call(saveOrder, action.payload);
        yield put(actions.orderDetailCreator.setInfo(action.payload));
        message.success('保存成功');
    } catch (err) {
        message.error(err.message);
    }
}

function saveOrder(params) {
    return http.post('/order-detail/save', params);
}

function* exportOrderController(action) {
    const data = storageService.getStorage();
    try {
        const orderCode = action.payload.orderCode;
        window.open(`${API_PREFIX}/order-detail/export?orderCode=${orderCode}&access_token=${data.token}&lang=${data.lang}`);
    } catch (err) {
        message.error(err.message);
    }
}

function* orderDetailSaga() {
    yield takeLatest(actions.INIT_ORDER_DETAIL, initOrderDetailController);
    yield takeLatest(actions.LOAD_INFO, loadInfoController);
    yield takeLatest(actions.SAVE_AS_NEW_ORDER, saveAsNewOrderController);
    yield takeLatest(actions.DELETE_ORDER, deleteOrderController);
    yield takeLatest(actions.SAVE_ORDER, saveOrderController);
    yield takeLatest(actions.EXPORT_ORDER, exportOrderController);
}

export function* orderDetailSagas() {
    yield all([
        fork(orderDetailSaga),
        fork(infoSaga),
        fork(cartSagas),
        fork(listSaga),
        fork(editSaga),
        fork(importFileSaga)
    ]);
}
