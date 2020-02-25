import {fork, all, put, call, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import * as actions from './actions';
import {partInfoSaga} from './part-info/saga';
import {applicabilitySaga} from './applicability/saga';
import {replaceSaga} from './replace/saga';
import {bulletinSaga} from './bulletin/saga';
import {http} from '@/common/http';
import {partInfoCreator} from './part-info/actions';
import {applicabilityCreator} from './applicability/actions';
import {replaceCreator} from './replace/actions';

function* loadPartDetailController(action) {
    try {
        const partCode = action.payload.partCode;

        yield put(partInfoCreator.loadPartInfo({partCode}));
        yield put(actions.partDetailCreator.setIsShowPartDetail({
            isShow: true,
            activeTab: action.payload.activeTab,
            partCode
        }));
        yield put(applicabilityCreator.loadApplicability({partCode}));
        yield put(replaceCreator.loadReplace({partCode}));
    } catch(err) {
        message.error(err.message);
    }
}

function* loadCountController(action) {
    try {
        const data = yield call(loadCount, action.payload);
        yield put(actions.partDetailCreator.setCount(data.bulletinCount));
    } catch(err) {
        message.error(err.message);
    }
}

function loadCount(params) {
    return http.post('/bulletin/statics', params);
}

function* partDetailSaga() {
    yield takeLatest(actions.LOAD_PART_DETAIL, loadPartDetailController);
    yield takeLatest(actions.LOAD_COUNT, loadCountController);
}

export function* partDetailSagas() {
    yield all(
        [
            fork(partDetailSaga),
            fork(partInfoSaga),
            fork(applicabilitySaga),
            fork(replaceSaga),
            fork(bulletinSaga)
        ]
    );
}
