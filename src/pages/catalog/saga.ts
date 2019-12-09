import {call, put, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import {crumbsText} from '@/pages/common/crumbs/reducer';
import * as crumbsActions from '@/pages/common/crumbs/actions';
import {defaultCode} from '@/pages/common/crumbs/reducer';
import * as actions from './actions';


function* loadBrandsController(action) {
    try {
        const brands = yield call(loadBrands);
        yield put(actions.brandsCreator.success(brands));

        let activeM1Code;
        let activeM2Code;
        let activeM3Code;
        let activeM4Code;

        if ( action.payload) {
            activeM1Code = action.payload.m_1;
            activeM2Code = action.payload.m_2;
            activeM3Code = action.payload.m_3;
            activeM4Code = action.payload.m_4;
        } else {
            activeM1Code = brands && brands[0] && brands[0].code;
            activeM2Code = brands && brands[0] && brands[0].list && brands[0].list[0] && brands[0].list[0].code;
            activeM3Code = defaultCode;
            activeM4Code = defaultCode;
        }

        const params = {
            m_1: activeM1Code,
            m_2: activeM2Code,
            m_3: activeM3Code,
            m_4: activeM4Code
        };

        yield put(actions.catalogCreator.setActiveCodes(params));
        yield put(crumbsActions.crumbsCreator.load(params));
        yield put(actions.conditionsCreator.beforeLoad());
        yield put(actions.conditionsCreator.load(params));

    } catch (err) {
        yield put(actions.brandsCreator.failed(err.message));
    }
}

function* loadConditionsController(action) {
    try {
        const data = yield call(loadConditions(action.payload));

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
                    name: crumbsText.all
                });
            }
        });
    }

    return data;
}

function loadBrands() {
    return http.get('/mapping/main');
}

function loadConditions(params) {
    return () => {
        return http.post('/mapping/next', params);
    };
}

export function* catalogSaga() {
    yield takeLatest(actions.LOAD_BRANDS, loadBrandsController);
    yield takeLatest(actions.LOAD_CONDITIONS, loadConditionsController);
}
