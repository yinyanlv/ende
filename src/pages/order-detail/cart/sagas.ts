import {put, call, all, fork, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import {buildQueryParams, rebuildFieldsToFilters} from '@/common/utils';
import * as actions from './actions';
import {querySaga} from './query/saga';
import {getText} from '@/pages/common/intl';

function* doQueryController(action) {
    try {
        yield put(actions.cartCreator.setIsLoading({isLoading: true}));
        yield put(actions.cartCreator.setQueryParams(action.payload));
        action.payload.sorts = [{field: 'createdDate', asc: false}];
        const data = yield call(doQuery, action.payload);
        yield put(actions.cartCreator.setSelectedRecords([]));
        yield put(actions.cartCreator.setCart(data));
        yield put(actions.cartCreator.setIsLoading({isLoading: false}));
    } catch(err) {
        yield put(actions.cartCreator.setIsLoading({isLoading: false}));
        message.error(err.message);
    }
}

function doQuery(params) {
    return http.post('/order-detail/page', params);
}

function* deletePartController(action) {
    try {
        yield call(deletePart, action.payload);
        const filters = rebuildFieldsToFilters({
            orderCode: action.payload.orderCode
        });
        yield put(actions.cartCreator.doQuery(buildQueryParams(filters)));
        message.success(getText('msg.a12'));
    } catch(err) {
        message.error(err.message);
    }
}

function deletePart(params) {
    return http.post('/order-detail/delete', {
        orderCode: params.orderCode,
        partCodes: params.partCodes
    });
}

function* addPartController(action) {
    try {
        yield call(addPart, action.payload);
        const filters = rebuildFieldsToFilters({
           orderCode: action.payload.orderCode
        });
        yield put(actions.cartCreator.doQuery(buildQueryParams(filters)));
        message.success(getText('msg.a16'));
    } catch(err) {
        message.error(err.message);
    }
}

function addPart(params) {
    return http.post('/order-detail/add', {
        orderCode: params.orderCode,
        partCode: params.partCode
    });
}

function* editQtyController(action) {
    try {
        const data = yield call(editQty, action.payload);
        const partCode = action.payload.partCode;
        const list = action.payload.list;
        const tip = data.tip;
        if (tip) {
            message.success(tip);
        }
        const newList = updateRecord(partCode, list, {
            qty: data.qty,
            amount: data.amount
        });

        yield put(actions.cartCreator.updateRecord(newList));
    } catch(err) {
        message.error(err.message);
    }
}

function updateRecord(partCode, list, params) {
    return list.map((item) => {
        if (item.partCode === partCode) {
            item.amount = params.amount;
            item.qty = params.qty;
        }
        return item;
    });
}

function editQty(params) {
    return http.post('/order-detail/update-qty', {
        orderCode: params.orderCode,
        partCode: params.partCode,
        qty: params.qty
    });
}

function* cartSaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
    yield takeLatest(actions.DELETE_PARTS, deletePartController);
    yield takeLatest(actions.ADD_PART, addPartController);
    yield takeLatest(actions.EDIT_QTY, editQtyController);
}

export function* cartSagas() {
    yield all([
        fork(querySaga),
        fork(cartSaga)
    ]);
}
