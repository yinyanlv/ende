import {takeLatest, all, put, fork} from 'redux-saga/effects';
import {message} from 'antd';
import {getHashObj} from '@/common/utils';
import * as actions from './actions';
import {groupsCreator} from './groups/actions';
import {legendsCreator} from './legends/actions';
import {groupsSaga} from './groups/saga';
import {legendsSaga} from './legends/saga';
import {partsSagas} from './parts/sagas';

function* initUsageController() {
    try {

        yield put(actions.usageCreator.resetUsage());
        yield put(legendsCreator.resetLegends());
        yield put(groupsCreator.resetGroups());
        const hashObj = getHashObj();

        if (hashObj && hashObj.callout) {
            yield put(actions.usageCreator.setActiveCallout(hashObj.callout));
        }

        yield put(groupsCreator.load());
    } catch(err) {
        message.error(err.message);
    }
}

function* usageSaga() {
    yield takeLatest(actions.INIT_USAGE, initUsageController);
}

export function* usageSagas() {
    yield all([
        fork(usageSaga),
        fork(groupsSaga),
        fork(legendsSaga),
        fork(partsSagas)
    ]);
}

