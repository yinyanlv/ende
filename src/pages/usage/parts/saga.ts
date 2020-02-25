import {call, put, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import {getUrlAndParams} from '@/common/utils';
import * as actions from './actions';

function* loadPartsController(action) {
    try {
        const params = action.payload;
        const parts = yield call(loadParts, params);
        yield put(actions.partsCreator.success(parts));
    } catch (err) {
        yield put(actions.partsCreator.failed(err.message));
    }
}

const LOAD_PARTS_URL_MAP = {
    normal: '/usage/parts',
    vin: '/vin-usage/vin/parts',
    vsn: '/vin-usage/vsn/parts'
};

function loadParts(params) {
    const result = getUrlAndParams(LOAD_PARTS_URL_MAP, params);

    return http.post(result.url, result.params);
}

export function* partsSaga() {
    yield takeLatest(actions.LOAD_PARTS, loadPartsController);
}

