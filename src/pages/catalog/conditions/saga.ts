import {call, put, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import {defaultCode} from '@/pages/common/crumbs/reducer';
import * as actions from './actions';
import {intl} from '@/pages/common/intl';

function* loadConditionsController(action) {
    try {
        const data = yield call(loadConditions, action.payload);

        yield put(actions.conditionsCreator.success(rebuildConditions(data)));
    } catch (err) {
        yield put(actions.conditionsCreator.failed(err.message));
    }
}

function rebuildConditions(data) {
    if (data) {
        data.forEach((item) => {

            if (item.list) {
                item.list.unshift({
                    id: defaultCode,
                    code: defaultCode,
                    name: intl.formatMessage({id: 'crumbs.all'})
                });
            }
        });
    }

    return data;
}

function loadConditions(params) {
    return http.post('/mapping/next', params);
}

export function* conditionsSaga() {
    yield takeLatest(actions.LOAD_CONDITIONS, loadConditionsController);
}
