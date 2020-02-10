import {createAction} from '@/common/utils';

export const REPLACE_QUERY = 'search:replace:query';
export const SET_REPLACE_LIST = 'search:replace:set-replace-list';

export const replaceCreator = {
    replaceQuery: (params) => {
        return createAction(REPLACE_QUERY, params);
    },
    setReplaceList: (params) => {
        return createAction(SET_REPLACE_LIST, params);
    }
};
