import {call, put, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';

function* loadBrandsController(action) {
    try {
        const brands = yield call(loadBrands);
        yield put(actions.loadBrandsCreator.success(brands));

        const seriesCode = brands && brands[0] && brands[0].list && brands[0].list[0] && brands[0].list[0].code;

        if (seriesCode) {
            yield put(actions.loadConditionsCreator.beforeRequest());
            yield put(actions.loadConditionsCreator.request({
                m_2: seriesCode
            }));
        }

    } catch (err) {
        yield put(actions.loadBrandsCreator.failed(err.message));
    }
}

function* loadConditionsController(action) {
    try {
        const data = yield call(loadConditions(action.payload));

        yield put(actions.loadConditionsCreator.success(data));
    } catch (err) {
        yield put(actions.loadConditionsCreator.failed(err.message));
    }
}

export function *catalogSaga() {
    yield takeLatest(actions.LOAD_BRANDS, loadBrandsController);
    yield takeLatest(actions.LOAD_CONDITIONS, loadConditionsController);
}

export function loadBrands() {
    return http.get('/mapping/main');
}

export function loadConditions(params) {
    return () => {

        return http.post('/mapping/next', params);
    };
}
