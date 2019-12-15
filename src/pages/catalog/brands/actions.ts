import {createAction} from '@/common/utils';

export const LOAD_BRANDS = 'catalog:load-brands';
export const LOAD_BRANDS_SUCCESS = 'catalog:load-brands-success';
export const LOAD_BRANDS_FAILED = 'catalog:load-brands-failed';

export const SET_ACTIVE_BRANDS_CODE = 'catalog:set-active-brands-codes';

export const brandsCreator = {
    load: (params?) => {
        return createAction(LOAD_BRANDS, params);
    },
    success: (data) => {
        return createAction(LOAD_BRANDS_SUCCESS, data);
    },
    failed: (message) => {
        return createAction(LOAD_BRANDS_FAILED, message);
    },
    setActiveBrandsCodes: (params) => {
        return createAction(SET_ACTIVE_BRANDS_CODE, rebuildActiveCodes(params));
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

