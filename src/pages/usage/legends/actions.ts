import {createAction} from '@/common/utils';

export const LOAD_LEGENDS = 'usage:load-legends';
export const LOAD_LEGENDS_SUCCESS = 'usage:load-legends-success';
export const LOAD_LEGENDS_FAILED = 'usage:load-legends-failed';

export const RESET_LEGENDS = 'usage:reset-legend';

export const legendsCreator = {
    resetLegends: () => {
        return createAction(RESET_LEGENDS);
    },
    load: (params) => {
        return createAction(LOAD_LEGENDS, params);
    },
    success: (data) => {
        return createAction(LOAD_LEGENDS_SUCCESS, data);
    },
    failed: (message) => {
        return createAction(LOAD_LEGENDS_FAILED, message);
    }
};
