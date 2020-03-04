import {takeLatest, all, call, put} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import * as actions from './actions';

function* loadTransportController() {
    try {
        const list = yield call(loadTransport);
        yield put(actions.infoCreator.setTransport(list));
    } catch(err) {
        message.error(err.message);
    }
}

function loadTransport() {
    return http.get('/order/transport');
}

function* loadTypeController() {
    try {
        const list = yield call(loadType);
        yield put(actions.infoCreator.setType(list));
    } catch(err) {
        message.error(err.message);
    }
}

function loadType() {
    return http.get('/order/type');
}

function* loadOrganizationController() {
    try {
        const list = yield call(loadOrganization);
        yield put(actions.infoCreator.setOrganization(list));
    } catch(err) {
        message.error(err.message);
    }
}

function loadOrganization() {
    return http.get('/order/organization');
}

function* loadChannelController() {
    try {
        const list = yield call(loadChannel);
        yield put(actions.infoCreator.setChannel(list));
    } catch(err) {
        message.error(err.message);
    }
}

function loadChannel() {
    return http.get('/order/channel');
}

function* loadProductGroupController() {
    try {
        const list = yield call(loadProductGroup);
        yield put(actions.infoCreator.setProductGroup(list));
    } catch(err) {
        message.error(err.message);
    }
}

function loadProductGroup() {
    return http.get('/order/product-group');
}

function* loadFactoryController() {
    try {
        const list = yield call(loadFactory);
        yield put(actions.infoCreator.setFactory(list));
    } catch(err) {
        message.error(err.message);
    }
}

function loadFactory() {
    return http.get('/order/factory');
}

function* loadPlanningController() {
    try {
        const list = yield call(loadPlanning);
        yield put(actions.infoCreator.setPlanning(list));
    } catch(err) {
        message.error(err.message);
    }
}

function loadPlanning() {
    return http.get('/order/planning');
}

export function* infoSaga() {
    yield takeLatest(actions.LOAD_TRANSPORT, loadTransportController);
    yield takeLatest(actions.LOAD_TYPE, loadTypeController);
    yield takeLatest(actions.LOAD_ORGANIZATION, loadOrganizationController);
    yield takeLatest(actions.LOAD_CHANNEL, loadChannelController);
    yield takeLatest(actions.LOAD_PRODUCT_GROUP, loadProductGroupController);
    yield takeLatest(actions.LOAD_FACTORY, loadFactoryController);
    yield takeLatest(actions.LOAD_PLANNING, loadPlanningController);
}
