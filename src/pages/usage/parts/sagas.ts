import {call, put, takeLatest, all, fork} from 'redux-saga/effects';
import {http} from '@/common/http';
import {getHashObj, getUrlAndParams} from '@/common/utils';
import * as actions from './actions';
import {usageCreator} from '@/pages/usage/actions';

function* loadPartsController(action) {
    try {
        const params = action.payload;
        const parts = yield call(loadParts, params);
        const hashObj = getHashObj();

        // 当url的hash部分有callout参数时，不重置store中的callout
        // 清空callout的目的是切换图例时不被上一次的状态污染
        if (!hashObj || hashObj && typeof hashObj.callout === 'undefined') {
            yield put(usageCreator.setActiveCallout(''));
        }
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

function* partsSaga() {
    yield takeLatest(actions.LOAD_PARTS, loadPartsController);
}

export function* partsSagas() {
    yield all([
        fork(partsSaga)
    ]);
}

