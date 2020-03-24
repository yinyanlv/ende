import {createAction} from '@/common/utils';

export const IS_SHOW_SEARCH = 'search:is-show-search';
export const QUERY_AND_SHOW_SEARCH = 'search:query-and-show-search';
export const SET_ACTIVE_TAB = 'search:set-active-tab';

export const searchCreator = {
    setIsShowSearch: (params) => {
        return createAction(IS_SHOW_SEARCH, params);
    },
    queryAndShowSearch: (params) => {
        return createAction(QUERY_AND_SHOW_SEARCH, params);
    },
    setActiveTab: (params) => {
        return createAction(SET_ACTIVE_TAB, params);
    }
};
