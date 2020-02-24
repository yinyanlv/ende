import {createAction} from '@/common/utils';

export const IS_SHOW_PART_DETAIL = 'part-detail:is-show-part-detail';
export const LOAD_PART_DETAIL= 'part-detail:load-part-detail';
export const LOAD_COUNT = 'part-detail:load-count';
export const SET_COUNT = 'part-detail:set-count';

export const partDetailCreator = {
    loadPartDetail: (params) => {
        return createAction(LOAD_PART_DETAIL, params);
    },
    setIsShowPartDetail: (params) => {
        return createAction(IS_SHOW_PART_DETAIL, params);
    },
    loadCount: (params) => {
        return createAction(LOAD_COUNT, params);
    },
    setCount: (params) => {
        return createAction(SET_COUNT, params);
    }
};
