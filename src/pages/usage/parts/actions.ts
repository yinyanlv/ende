import {createAction} from '@/common/utils';

export const LOAD_PARTS = 'usage:parts:load-parts';
export const LOAD_PARTS_SUCCESS = 'usage:parts:load-parts-success';
export const LOAD_PARTS_FAILED = 'usage:parts:load-parts-failed';
export const SET_SELECTED_KEYS = 'usage:parts:set-selected-keys';
export const SET_WIDTH = 'usage:parts:set-width';

export const partsCreator = {
    load: (params) => {
        return createAction(LOAD_PARTS, params);
    },
    success: (data) => {
        return createAction(LOAD_PARTS_SUCCESS, data);
    },
    failed: (message) => {
        return createAction(LOAD_PARTS_FAILED, message);
    },
    setSelectedKeys: (params) => {
        return createAction(SET_SELECTED_KEYS, params);
    },
    setWidth: (params) => {
        return createAction(SET_WIDTH, params);
    }
};

