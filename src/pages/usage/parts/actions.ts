import {createAction} from '@/common/utils';

export const LOAD_PARTS = 'usage:load-parts';
export const LOAD_PARTS_SUCCESS = 'usage:load-parts-success';
export const LOAD_PARTS_FAILED = 'usage:load-parts-failed';

export const partsCreator = {
    load: (params) => {
        return createAction(LOAD_PARTS, params);
    },
    success: (data) => {
        return createAction(LOAD_PARTS_SUCCESS, data);
    },
    failed: (message) => {
        return createAction(LOAD_PARTS_FAILED, message);
    }
};

