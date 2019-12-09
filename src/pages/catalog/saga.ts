import {call, put, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';

function* loadBrandsController(action) {
    try {
        const brands = yield call(loadBrands);
        yield put(actions.brandsCreator.success(brands));

        let m2Code = action.payload && action.payload.m_2;

        if (!m2Code) {
            m2Code = brands && brands[0] && brands[0].list && brands[0].list[0] && brands[0].list[0].code;
        }

        if (m2Code) {
            yield put(actions.conditionsCreator.beforeRequest());
            yield put(actions.conditionsCreator.request({
                m_2: m2Code
            }));
        }

    } catch (err) {
        yield put(actions.brandsCreator.failed(err.message));
    }
}

function* loadConditionsController(action) {
    try {
        const data = yield call(loadConditions(action.payload));

        yield put(actions.conditionsCreator.success(data));
    } catch (err) {
        yield put(actions.conditionsCreator.failed(err.message));
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
