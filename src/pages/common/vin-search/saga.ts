import {put, takeLatest, call} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import * as actions from './actions';
import {vsnSelectorCreator} from '@/pages/common/vsn-selector/actions';
import {vinDetailCreator} from '@/pages/common/vin-detail/actions';
import {queryCreator} from '@/pages/common/search/advance-search/query/actions';

function* vinSearchController(action) {
    try {
        const data = yield call(doVinSearch, action.payload);

        yield put(vinDetailCreator.setIsShowVinDetail({
            type: 'vin',
            data: data,
            isShow: true,
            zIndex: action.payload.zIndex
        }));
    } catch (err) {
        message.error(err.message);
    }
}

function doVinSearch(params) {
    return http.post('/vin/detail', {
        code: params.code
    });
}

function* vsnSelectModelController(action) {
    try {
        const list = yield call(doVsnSelectModel, action.payload);
        const advanceSearchParams = action.payload.advanceSearchParams;

        // vsn对应的车型唯一，直接显示vsn详情
        if (list.length === 1) {
            // 该action来自高级查询，并且vin-selector只有一条数据，则带入参数，执行高级查询
            if (advanceSearchParams) {
                advanceSearchParams.filters.push({
                    name: 'vsnModel',
                    value: list[0].modelId
                });

                return yield put(queryCreator.doQuery(advanceSearchParams));
            }

            yield put(actions.vinSearchCreator.doVsnSearch({
                code: action.payload.code,
                model: list[0].modelId,
                zIndex: action.payload.zIndex
            }));
        } else if (list.length > 1) {
            yield put(vsnSelectorCreator.setIsShowVsnSelector({
                isShow: true,
                vsnCode: action.payload.code,
                list,
                advanceSearchParams,
                zIndex: action.payload.zIndex
            }));
        }
    } catch (err) {
        message.error(err.message);
    }
}

function doVsnSelectModel(params) {
    return http.post('/vsn/select', {
        code: params.code
    });
}

function* vsnSearchController(action) {
    try {
        const data: any = yield call(doVsnSearch, action.payload);
        yield put(vsnSelectorCreator.setIsShowVsnSelector({
            isShow: false,
            list: []
        }));
        yield put(vinDetailCreator.setIsShowVinDetail({
            type: 'vsn',
            data: data,
            isShow: true,
            zIndex: action.payload.zIndex
        }));
    } catch (err) {
        message.error(err.message);
    }
}

function doVsnSearch(params) {
    return http.post('/vsn/detail', {
        code: params.code,
        model: params.model
    });
}

export function* vinSearchSaga() {
    yield takeLatest(actions.VIN_SEARCH, vinSearchController);
    yield takeLatest(actions.VSN_SELECT_MODEL, vsnSelectModelController);
    yield takeLatest(actions.VSN_SEARCH, vsnSearchController);
}
