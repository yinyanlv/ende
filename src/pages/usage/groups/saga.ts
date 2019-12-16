import {call, put, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import {getQueryObj, getMQueryObj, getSQueryObj} from '@/common/utils';
import * as actions from './actions';
import * as crumbsActions from '@/pages/common/crumbs/actions';

function* loadGroupsController(action) {
    try {
        const queryObj = getQueryObj();
        const mQueryObj = getMQueryObj();
        const sQueryObj = getSQueryObj();
        const groups = yield call(loadGroup, mQueryObj);
        const list = groups && groups.list;
        yield put(actions.groupsCreator.success(list));
        yield put(crumbsActions.crumbsCreator.load(queryObj));

        const nodeInfo = getActiveTreeNodeInfo(sQueryObj);

        if (nodeInfo) {
            yield put(actions.groupsCreator.setActiveTreeNodeCode(nodeInfo.activeTreeNodeCode));
            yield put(actions.groupsCreator.setExpandedTreeNodeCodes(nodeInfo.parentCodes));
        }

        const node: any = document.querySelector('.panel-tree .ant-tree-node-selected');

        if (node && node.click) {
            node.click();
        }
    } catch (err) {
        yield put(actions.groupsCreator.failed(err.message));
    }
}

function getActiveTreeNodeInfo(params) {
    const keys = Object.keys(params).sort();

    if (keys.length) {
        let code;
        let parentCodes: any = [];

        keys.forEach((key, index) => {
            if (index === (keys.length - 1)) {
                code = params[key];
            } else {
                parentCodes.push(params[key]);
            }
        });

        return {
            activeTreeNodeCode: code,
            parentCodes: parentCodes
        };
    } else {
        return null;
    }
}

function loadGroup(params) {
    return http.post('/usage', params);
}

export function* groupsSaga() {
    yield takeLatest(actions.LOAD_GROUPS, loadGroupsController);
}

