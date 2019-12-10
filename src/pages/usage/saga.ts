import {call, put, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';
import * as crumbsActions from "@/pages/common/crumbs/actions";

function* loadGroupsController(action) {
    try {
        const params = action.payload;
        const groups = yield call(loadGroup(params));
        yield put(actions.groupsCreator.success(groups && groups.list));
        yield put(crumbsActions.crumbsCreator.load(params));
    } catch (err) {
        yield put(actions.groupsCreator.failed(err.message));
    }
}

function* loadLegendsController(action) {
    try {
        const params = action.payload;
        const legends = yield call(loadLegends(params));
        yield put(actions.legendsCreator.success(legends));
    } catch (err) {
        yield put(actions.legendsCreator.failed(err.message));
    }
}

function* loadPartsController(action) {
    try {
        const params = action.payload;
        const parts = yield call(loadParts(params));
        yield put(actions.partsCreator.success(parts));
    } catch (err) {
        yield put(actions.partsCreator.failed(err.message));
    }
}

function loadGroup(params) {
    return () => {
        return http.post('/usage', params);
    };
}

function loadLegends(params) {
    return () => {
        return http.post('/usage/struct/flat-descendant', params)
    };
}

function loadParts(params) {
   return() => {
       return http.post('/usage/parts', params);
   };
}

export function* usageSaga() {
    yield takeLatest(actions.LOAD_GROUPS, loadGroupsController);
    yield takeLatest(actions.LOAD_LEGENDS, loadLegendsController);
    yield takeLatest(actions.LOAD_PARTS, loadPartsController);
}

