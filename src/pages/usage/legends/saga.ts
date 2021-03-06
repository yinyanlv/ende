import {call, put, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import {getUrlAndParams} from '@/common/utils';
import * as actions from './actions';

function* loadLegendsController(action) {
    try {
        const params = action.payload;
        const legends = yield call(loadLegends, params);
        yield put(actions.legendsCreator.success(legends));
    } catch (err) {
        yield put(actions.legendsCreator.failed(err.message));
    }
}

const LOAD_LEGENDS_URL_MAP = {
    normal: '/usage/struct/flat-descendant',
    vin: '/vin-usage/vin/struct/flat-descendant',
    vsn: '/vin-usage/vsn/struct/flat-descendant'
};

function loadLegends(params) {
    const result = getUrlAndParams(LOAD_LEGENDS_URL_MAP, params);

    return http.post(result.url, result.params);
}

export function* legendsSaga() {
    yield takeLatest(actions.LOAD_LEGENDS, loadLegendsController);
}

