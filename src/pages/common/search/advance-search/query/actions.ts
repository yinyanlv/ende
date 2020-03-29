import {createAction} from '@/common/utils';

export const SET_FIELDS_VALUE = 'search:advance-search:set-fields-value';
export const DO_QUERY = 'search:advance-search:query:do-query';
export const LOAD_GROUP = 'search:advance-search:query:load-group';
export const SET_GROUP = 'search:advance-search:query:set-group';
export const LOAD_MODEL_OPTIONS = 'search:advance-search:query:load-model-options';
export const SET_MODEL_OPTIONS = 'search:advance-search:query:set-model-options';
export const LOAD_M1 = 'search:advance-search:query:load-m1';
export const LOAD_M2 = 'search:advance-search:query:load-m2';
export const LOAD_M3 = 'search:advance-search:query:load-m3';
export const LOAD_M4 = 'search:advance-search:query:load-m4';
export const SET_M1 = 'search:advance-search:query:set-m1';
export const SET_M2 = 'search:advance-search:query:set-m2';
export const SET_M3 = 'search:advance-search:query:set-m3';
export const SET_M4 = 'search:advance-search:query:set-m4';
export const VALIDATE_VIN = 'search:advance-search:query:validate-vin';
export const VALIDATE_VSN = 'search:advance-search:query:validate-vsn';
export const SET_IS_SHOW_BTN_DETAIL ='search:advance-search:query:set-is-show-btn-detail';
export const RESET_STATE ='search:advance-search:query:reset-state';

export const queryCreator = {
    setFieldsValue: (params) => {
        return createAction(SET_FIELDS_VALUE, params);
    },
    loadGroup: () => {
        return createAction(LOAD_GROUP);
    },
    setGroup: (list) => {
        return createAction(SET_GROUP, list);
    },
    loadModelOptions: (params) => {
        return createAction(LOAD_MODEL_OPTIONS, params);
    },
    setModelOptions: (params) => {
        return createAction(SET_MODEL_OPTIONS, params);
    },
    loadM1: () => {
        return createAction(LOAD_M1);
    },
    setM1: (list) => {
        return createAction(SET_M1, list);
    },
    loadM2: (params) => {
        return createAction(LOAD_M2, params);
    },
    setM2: (list) => {
        return createAction(SET_M2, list);
    },
    loadM3: (params) => {
        return createAction(LOAD_M3, params);
    },
    setM3: (list) => {
        return createAction(SET_M3, list);
    },
    loadM4: (params) => {
        return createAction(LOAD_M4, params);
    },
    setM4: (list) => {
        return createAction(SET_M4, list);
    },
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    },
    validateVin: (params) => {
        return createAction(VALIDATE_VIN, params);
    },
    validateVsn: (params) => {
        return createAction(VALIDATE_VSN, params);
    },
    setIsShowBtnDetail: (params) => {
        return createAction(SET_IS_SHOW_BTN_DETAIL, params);
    },
    resetState: () => {
        return createAction(RESET_STATE);
    }
};
