import {fork, put, all, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import {rebuildFieldsToFilters, buildQueryParams} from '@/common/utils';
import {advanceSearchSagas} from './advance-search/sagas';
import {replaceSagas} from './replace/sagas';
import * as actions from './actions';
import {advanceSearchCreator} from './advance-search/actions';
import {queryCreator} from './advance-search/query/actions';

function* queryAndShowSearchController(action) {
    try {
        const zIndex = action.payload.zIndex;
        const activeTab = action.payload.activeTab;
        delete action.payload.zIndex;
        delete action.payload.activeTab;
        const filters = rebuildFieldsToFilters(action.payload);
        const queryParams = buildQueryParams(filters);

        yield put(queryCreator.setFieldsValue(action.payload));
        yield put(actions.searchCreator.setIsShowSearch({
            isShow: true,
            zIndex: zIndex,
            activeTab
        }));
        yield put(advanceSearchCreator.doQuery(queryParams));
    } catch(err) {
        message.error(err.message);
    }
}

function* searchSaga() {
    yield takeLatest(actions.QUERY_AND_SHOW_SEARCH, queryAndShowSearchController);
}

export function* searchSagas() {
    yield all(
        [
            fork(searchSaga),
            fork(advanceSearchSagas),
            fork(replaceSagas)
        ]
    );
}
