import {takeLatest, put, call} from 'redux-saga/effects';
import queryString from 'query-string';
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
        temp.url = index < keys.length - 1 ? buildUrl(codeMap, key) : '';

        list.push(temp);
    });

    return list;
}

function buildUrl(params, key) {

    switch (key) {
        case 'm_1':
            return '/?' + queryString.stringify({
                m_1: params.m_1,
                m_2: params.m_2
            });
        case 'm_2':
            return '/?' +  queryString.stringify({
                m_1: params.m_1,
                m_2: params.m_2
            });
        case 'm_3':
            return '/?' + queryString.stringify({
                m_1: params.m_1,
                m_2: params.m_2,
                m_3: params.m_3
            });
        case 'm_4':
            return '/?' + queryString.stringify({
                m_1: params.m_1,
                m_2: params.m_2,
                m_3: params.m_3,
                m_4: params.m_4
            });
        default:
            return '';
    }
}
