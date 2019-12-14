import {call, put, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';
import * as crumbsActions from "@/pages/common/crumbs/actions";

function* loadGroupsController(action) {
    try {
        const params = action.payload;
        const groups = yield call(loadGroup, params);
        yield put(actions.groupsCreator.success(groups && groups.list));
        yield put(crumbsActions.crumbsCreator.load(params));
    } catch (err) {
        yield put(actions.groupsCreator.failed(err.message));
    }
}

function loadGroup(params) {
    return http.post('/usage', params);
}

export function* groupsSaga() {
    yield takeLatest(actions.LOAD_GROUPS, loadGroupsController);
}

