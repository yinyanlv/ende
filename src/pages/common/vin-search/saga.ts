import {put, takeLatest, call} from 'redux-saga/effects';
import {message} from 'antd';
import queryString from 'query-string';
import history from '@/common/history';
import {updateLocationSearch, updateLocationHash} from '@/common/utils';
import {http} from '@/common/http';
import * as actions from './actions';
import {vsnSelectorCreator} from '@/pages/common/vsn-selector/actions';
import {vinDetailCreator} from '@/pages/common/vin-detail/actions';
import {usageCreator} from '@/pages/usage/actions';

function isNeedRedirect(): boolean {
    return window.location.pathname === '/usage' ? false : true;
}

function redirectToUsage(params) {
    return history.push({
        pathname: '/usage',
        search: queryString.stringify(params)
    });
}

function* vinSearchController(action) {
    try {
        const data = yield call(doVinSearch, action.payload);
        const needRedirect = isNeedRedirect();
        const mappings = Object.assign({}, data.mappings, {
            type: 'vin',
            code: action.payload.code
        });
        if (needRedirect) {
            redirectToUsage(mappings);
        } else {
            updateLocationSearch(mappings);
            updateLocationHash();
            yield put(usageCreator.initUsage());
        }
        yield put(vinDetailCreator.setIsShowVinDetail({
            type: 'vin',
            data: data,
            isShow: true
        }));
    } catch (err) {
        message.error(err.message);
    }
}

function doVinSearch(params) {
    return http.post('/vin/detail', {
        code: params.code
    });
}

function* vsnSelectModelController(action) {
    try {
        const list = yield call(doVsnSelectModel, action.payload);

        if (list.length === 1) {

            yield put(actions.vinSearchCreator.doVsnSearch({
                code: action.payload.code,
                model: list[0].modelId
            }));
        } else if (list.length > 1) {
            yield put(vsnSelectorCreator.setIsShowVsnSelector({
                isShow: true,
                vsnCode: action.payload.code,
                list
            }));
        }
    } catch(err) {
        message.error(err.message);
    }
}

function doVsnSelectModel(params) {
    return http.post('/vsn/select', {
        code: params.code
    });
}

function* vsnSearchController(action) {
    try {
        const data: any = yield call(doVsnSearch, action.payload);
        const needRedirect = isNeedRedirect();
        const mappings = Object.assign({}, data.mappings, {
            type: 'vsn',
            code: action.payload.code
        });
        if (needRedirect) {
            redirectToUsage(mappings);
        } else {
            updateLocationSearch(mappings);
            updateLocationHash();
            yield put(usageCreator.initUsage());
        }
        yield put(vinDetailCreator.setIsShowVinDetail({
            type: 'vsn',
            data: data,
            isShow: true
        }));
    } catch(err) {
        message.error(err.message);
    }
}

function doVsnSearch(params) {
    return http.post('/vsn/detail', {
        code: params.code,
        model: params.model
    });
}

export function* vinSearchSaga() {
    yield takeLatest(actions.VIN_SEARCH, vinSearchController);
    yield takeLatest(actions.VSN_SELECT_MODEL, vsnSelectModelController);
    yield takeLatest(actions.VSN_SEARCH, vsnSearchController);
}
