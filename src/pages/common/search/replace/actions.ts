import {createAction} from '@/common/utils';

export const DO_QUERY = 'search:replace:do-query';
export const SET_REPLACE = 'search:replace:set-replace';

export const replaceCreator = {
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    },
    setReplace: (params) => {
        return createAction(SET_REPLACE, params);
    }
};
