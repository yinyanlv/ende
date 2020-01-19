import {createAction} from '@/common/utils';

export const QUERY_REPLACE = 'search:replace:query-replace';
export const SET_REPLACE_LIST = 'search:replace:set-replace-list';

export const replaceCreator = {
    queryReplace: (params) => {
        return createAction(QUERY_REPLACE, params);
    },
    setReplaceList: (params) => {
        return createAction(SET_REPLACE_LIST, params);
    }
};
