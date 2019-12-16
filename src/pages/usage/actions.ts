import {createAction} from '@/common/utils';

export const RESET_STATE = 'usage:reset-state';
export const SET_ACTIVE_CALLOUT = 'usage:set-active-callout';
export const CONTROL_PARTS_SHOW = 'usage:control-parts-show';
export const SET_IS_FIRST_LOAD = 'usage:set-is-first-load';

export const usageCreator = {
    resetState: () => {
        return createAction(RESET_STATE);
    },
    setActiveCallout: (params) => {
        return createAction(SET_ACTIVE_CALLOUT, params);
    },
    setIsShowParts: (params) => {
        return createAction(CONTROL_PARTS_SHOW, params);
    },
    setIsFirstLoad: (isFirstLoad) => {
        return createAction(SET_IS_FIRST_LOAD, isFirstLoad);
    }
};
