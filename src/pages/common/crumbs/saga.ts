import {takeLatest, put, call} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';
import {crumbsText} from './reducer';

function* loadCrumbsController(action) {
    const crumbs = yield call(loadCrumbs(action.payload));
    const crumbsList = rebuildCrumbs(action.payload, crumbs);

    yield put(actions.crumbsCreator.setCrumbs(crumbsList));
}

export function* crumbsSaga() {

    yield takeLatest(actions.LOAD_CRUMBS, loadCrumbsController);
}

function loadCrumbs(params) {
    return () => {
        return http.post('/mapping/name', params);
    };
}

function rebuildCrumbs(codeMap, nameMap) {
    const list: any[] = [];
    const keys = Object.keys(codeMap).sort();

    keys.forEach((key, index) => {
        const temp: any = {};
        temp.code = codeMap[key];
        temp.name = nameMap[key];
        temp.label = crumbsText[key];
        temp.url = nameMap[key];

        list.push(temp);
    });

    return list;
}