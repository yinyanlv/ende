import {takeLatest, put, call} from 'redux-saga/effects';
import queryString from 'query-string';
import {http} from '@/common/http';
import {getPageSearchType} from '@/common/utils';
import {intl} from '@/pages/common/intl';
import * as actions from './actions';
import {defaultCode} from './reducer';

function* loadCrumbsController(action) {
    const crumbs = yield call(loadCrumbs, action.payload);
    const crumbsList = rebuildCrumbs(action.payload, crumbs);
    const pageSearchType = getPageSearchType();

    if (pageSearchType.type === 'vin') {
        crumbsList.unshift({
            code: defaultCode,
            name: pageSearchType.code,
            label: 'VIN',
            url: ''
        });
    } else if (pageSearchType.type === 'vsn') {
        crumbsList.unshift({
            code: defaultCode,
            name: pageSearchType.code,
            label: 'VSN',
            url: ''
        });
    }

    yield put(actions.crumbsCreator.setCrumbs(crumbsList));
}

function loadCrumbs(params) {
    return http.post('/dictionary/name', params);
}

function rebuildCrumbs(codeMap, nameMap) {
    const list: any[] = [];
    const keys = Object.keys(codeMap).sort();
    const usageCrumbs: string[] = [];

    keys.forEach((key, index) => {

        if (key.startsWith('m_')) {
            const temp: any = {};

            temp.code = codeMap[key];
            temp.name = nameMap[key];
            temp.label = intl.formatMessage({id: 'crumbs.' + key});
            temp.url = index < keys.length - 1 ? buildUrl(codeMap, key) : '';

            list.push(temp);
        } else if (key.startsWith('s_')) {
            // 收集usage页面自有的crumbs
            usageCrumbs.push(nameMap[key]);
        }
    });

    // 合并usage页面自有的crumbs
    if (usageCrumbs.length) {
        const usageName = usageCrumbs.join(' : ');
        list.push({
            code: defaultCode,
            name: usageName,
            label: intl.formatMessage({id: 'crumbs.s_1'}),
            url: ''
        });
    }

    return list;
}

function buildUrl(params, key) {

    switch (key) {
        case 'm_1':
            return '/?' + queryString.stringify({
                m_1: params.m_1,
                m_2: params.m_2,
                m_3: defaultCode,
                m_4: defaultCode
            });
        case 'm_2':
            return '/?' + queryString.stringify({
                m_1: params.m_1,
                m_2: params.m_2,
                m_3: defaultCode,
                m_4: defaultCode
            });
        case 'm_3':
            return '/?' + queryString.stringify({
                m_1: params.m_1,
                m_2: params.m_2,
                m_3: params.m_3,
                m_4: defaultCode
            });
        case 'm_4':
            // TODO，与五菱耦合严重
            return '/usage?' + queryString.stringify({
                m_1: params.m_1,
                m_2: params.m_2,
                m_3: params.m_3,
                m_4: params.m_4
            });
        default:
            return '';
    }
}

export function* crumbsSaga() {

    yield takeLatest(actions.LOAD_CRUMBS, loadCrumbsController);
}
