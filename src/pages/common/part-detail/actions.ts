import {createAction} from '@/common/utils';

export const IS_SHOW_PART_DETAIL = 'part-detail:is-show-part-detail';
export const LOAD_AND_SHOW_PART_DETAIL= 'part-detail:load-and-show-part-detail';
export const LOAD_COUNT = 'part-detail:load-count';
export const SET_COUNT = 'part-detail:set-count';
export const SET_ACTIVE_TAB = 'part-detail:set-active-tab';

export const partDetailCreator = {
    loadAndShowPartDetail: (params) => {
        return createAction(LOAD_AND_SHOW_PART_DETAIL, params);
    },
    setIsShowPartDetail: (params) => {
        return createAction(IS_SHOW_PART_DETAIL, params);
    },
    loadCount: (params) => {
        return createAction(LOAD_COUNT, params);
    },
    setCount: (params) => {
        return createAction(SET_COUNT, params);
    },
    setActiveTab: (params) => {
        return createAction(SET_ACTIVE_TAB, params);
    }
};
