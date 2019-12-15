import {createAction} from '@/common/utils';

export const RESET_STATE = 'usage:reset-state';
export const SET_ACTIVE_CALLOUT = 'usage:set-active-callout';
export const CONTROL_LEGEND_SHOW = 'usage:control-legend-show';

export const LOAD_LEGENDS = 'usage:load-legends';
export const LOAD_LEGENDS_SUCCESS = 'usage:load-legends-success';
export const LOAD_LEGENDS_FAILED = 'usage:load-legends-failed';

export const LOAD_PARTS = 'usage:load-parts';
export const LOAD_PARTS_SUCCESS = 'usage:load-parts-success';
export const LOAD_PARTS_FAILED = 'usage:load-parts-failed';

export const usageCreator = {
    resetState: () => {
        return createAction(RESET_STATE);
    },
    setActiveCallout: (params) => {
        return createAction(SET_ACTIVE_CALLOUT, params);
    },
    setIsShowParts: (params) => {
        return createAction(CONTROL_LEGEND_SHOW, params);
    }
};

export const legendsCreator = {
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

