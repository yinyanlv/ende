import {createAction} from '@/common/utils';

export const RESET_USAGE = 'usage:reset-state';
export const SET_ACTIVE_CALLOUT = 'usage:set-active-callout';
export const SET_IS_LEGEND_PARTS_SHOW = 'usage:set-is-legend-parts-show';
export const SET_IS_FIRST_LOAD = 'usage:set-is-first-load';
export const SET_IS_SHOW_GROUPS = 'usage:set-is-show-groups';
export const SET_IS_SHOW_PARTS = 'usage:set-is-show-parts';

export const usageCreator = {
    resetUsage: () => {
        return createAction(RESET_USAGE);
    },
    setActiveCallout: (params) => {
        return createAction(SET_ACTIVE_CALLOUT, params);
    },
    setIsShowGroups: (params) => {
        return createAction(SET_IS_SHOW_GROUPS, params);
    },
    setIsShowLegendParts: (params) => {
        return createAction(SET_IS_LEGEND_PARTS_SHOW, params);
    },
    setIsShowParts: (params) => {
        return createAction(SET_IS_SHOW_PARTS, params);
    },
    setIsFirstLoad: (isFirstLoad) => {
        return createAction(SET_IS_FIRST_LOAD, isFirstLoad);
    }
};
