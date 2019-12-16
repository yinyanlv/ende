import {createAction} from '@/common/utils';

export const LOAD_CONDITIONS = 'catalog:load-conditions';
export const LOAD_CONDITIONS_BEFORE = 'catalog:load-conditions-before';
export const LOAD_CONDITIONS_SUCCESS = 'catalog:load-conditions-success';
export const LOAD_CONDITIONS_FAILED = 'catalog:load-conditions-failed';

export const SET_ACTIVE_CONDITIONS_CODES = 'catalog:set-active-conditions-codes';
export const RESET_ACTIVE_CONDITIONS_CODES = 'catalog:reset-active-conditions-codes';

export const conditionsCreator = {
    beforeLoad: () => {
        return createAction(LOAD_CONDITIONS_BEFORE);
    },
    load: (params) => {
        return createAction(LOAD_CONDITIONS, params);
    },
    success: (data) => {
        return createAction(LOAD_CONDITIONS_SUCCESS, data);
    },
    failed: (message) => {
        return createAction(LOAD_CONDITIONS_FAILED, message);
    },
    setActiveConditionsCodes: (params) => {
        return createAction(SET_ACTIVE_CONDITIONS_CODES, rebuildActiveCodes(params));
    },
    resetActiveConditionsCodes: () => {
        return createAction(RESET_ACTIVE_CONDITIONS_CODES);
    }
};

function rebuildActiveCodes(params) {
    let obj = {};
    Object.keys(params).forEach((key) => {
        const newKey = 'activeM'+ key.replace('m_', '') +'Code';
        obj[newKey] = params[key];
    });
    return obj;
}
