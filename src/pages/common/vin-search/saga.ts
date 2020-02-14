import {put, takeLatest, call} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import * as actions from './actions';
import {vsnSelectorCreator} from '@/pages/common/vsn-selector/actions';
import {vinDetailCreator} from '@/pages/common/vin-detail/actions';

function* vinSearchController(action) {
    try {
        const data = yield call(doVinSearch, action.payload);

        yield put(vinDetailCreator.setIsShowVinDetail({
            type: 'vin',
            data: data,
            isShow: true
        }));
    } catch (err) {
        yield put(vinDetailCreator.setIsShowVinDetail({
            type: 'vin',
            data: {},
            isShow: true
        }));
        // message.error(err.message);
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

        if (list.length === 1) {

            yield put(actions.vinSearchCreator.doVsnSearch({
                code: list[0].code,
                model: list[0].model
            }));
        } else if (list.length > 1) {
            yield put(vsnSelectorCreator.setIsShowVsnSelector({
                isShow: true,
                list
            }));
        }
    } catch(err) {

        yield put(vsnSelectorCreator.setIsShowVsnSelector({
            isShow: true
        }));
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
        const data = call(doVsnSearch, action.payload);

        yield put(vinDetailCreator.setIsShowVinDetail({
            type: 'vsn',
            data: data,
            isShow: true
        }));
    } catch(err) {

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