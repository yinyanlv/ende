import {createAction} from '@/common/utils';

export const RESET_STATE = 'catalog:reset-state';
export const SET_ACTIVE_CODES = 'catalog:set-active-codes';

export const LOAD_BRANDS = 'catalog:load-brands';
export const LOAD_BRANDS_SUCCESS = 'catalog:load-brands-success';
export const LOAD_BRANDS_FAILED = 'catalog:load-brands-failed';

export const LOAD_CONDITIONS = 'catalog:load-conditions';
export const LOAD_CONDITIONS_BEFORE = 'catalog:load-conditions-before';
export const LOAD_CONDITIONS_SUCCESS = 'catalog:load-conditions-success';
export const LOAD_CONDITIONS_FAILED = 'catalog:load-conditions-failed';

export const catalogCreator = {
    resetState: () => {
        return createAction(RESET_STATE);
    },
    setActiveCodes: (params) => {
        return createAction(SET_ACTIVE_CODES, rebuildActiveCodes(params));
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

export const brandsCreator = {
    load: (params?) => {
        return createAction(LOAD_BRANDS, params);
    },
    success: (data) => {
        return createAction(LOAD_BRANDS_SUCCESS, data);
    },
    failed: (message) => {
        return createAction(LOAD_BRANDS_FAILED, message);
    }
};

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
    }
};
