import {put, takeLatest, call} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';

export function* vinSearchSaga() {
    yield takeLatest(actions.VIN_SEARCH, vinSearchController);
    yield takeLatest(actions.VSN_SEARCH, vsnSearchController);
    yield takeLatest(actions.VSN_SELECT_MODEL, vsnSelectModelController);
}

function* vinSearchController(action) {
    const data = yield call(doVinSearch, action.payload);
    console.log(data);
}

function doVinSearch(params) {
    return http.post('/vin/detail', {
        code: params.value
    });
}

function* vsnSelectModelController(action) {
    const data = yield call(doVsnSelectModel, action.payload);
}

function doVsnSelectModel(params) {
    return http.post('/vsn/select', {
        code: params.value
    });
}

function* vsnSearchController(action) {
    const data = call(doVsnSearch, action.payload);
}

function doVsnSearch(params) {
    return http.post('/vsn/detail', {
        code: params.value,
        model: params.model
    });
}
