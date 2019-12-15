import {call, put, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as crumbsActions from '@/pages/common/crumbs/actions';
import {defaultCode} from '@/pages/common/crumbs/reducer';
import * as actions from './actions';
import * as conditionActions from '@/pages/catalog/conditions/actions';


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

        yield put(actions.brandsCreator.setActiveBrandsCodes({
            m_1: activeM1Code,
            m_2: activeM2Code
        }));
        yield put(conditionActions.conditionsCreator.setActiveConditionsCodes({
            m_3: activeM3Code,
            m_4: activeM4Code
        }));

        const params = {
            m_1: activeM1Code,
            m_2: activeM2Code,
            m_3: activeM3Code,
            m_4: activeM4Code
        };
        yield put(crumbsActions.crumbsCreator.load(params));
        yield put(conditionActions.conditionsCreator.beforeLoad());
        yield put(conditionActions.conditionsCreator.load(params));

    } catch (err) {
        yield put(actions.brandsCreator.failed(err.message));
    }
}

function loadBrands() {
    return http.get('/mapping/main');
}

export function* brandsSaga() {
    yield takeLatest(actions.LOAD_BRANDS, loadBrandsController);
}
