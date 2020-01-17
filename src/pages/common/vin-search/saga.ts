import {put, takeLatest, call} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import * as actions from './actions';
import {vsnSelectorCreator} from '@/pages/common/vsn-selector/actions';
import {vinDetailCreator} from '@/pages/common/vin-detail/actions';

export function* vinSearchSaga() {
    yield takeLatest(actions.VIN_SEARCH, vinSearchController);
    yield takeLatest(actions.VSN_SEARCH, vsnSearchController);
    yield takeLatest(actions.VSN_SELECT_MODEL, vsnSelectModelController);
}

function* vinSearchController(action) {
    try {
        const data = yield call(doVinSearch, action.payload);
    } catch (err) {
        message.error(err.message);
    }
}

function doVinSearch(params) {
    return http.post('/vin/detail', {
        code: params.value
    });
}

function* vsnSelectModelController(action) {
    const data = yield call(doVsnSelectModel, action.payload);

    put(vsnSelectorCreator.setIsShowVsnSelector({
        isShow: true,
        models: data
    }));
}

function doVsnSelectModel(params) {
    return http.post('/vsn/select', {
        code: params.value
    });
}

function* vsnSearchController(action) {
    const data = call(doVsnSearch, action.payload);
    vinDetailCreator.setIsShowVinDetail({
        isShow: true,
        type: 'vsn',
        data: data
    })
}

function doVsnSearch(params) {
    return http.post('/vsn/detail', {
        code: params.value,
        model: params.model
    });
}
