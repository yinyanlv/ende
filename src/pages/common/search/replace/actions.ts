import {createAction} from '@/common/utils';

export const DO_QUERY = 'search:replace:do-query';
export const SET_REPLACE = 'search:replace:set-replace';
export const SET_PART_CODE = 'search:replace:set-part-code';

export const replaceCreator = {
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    },
    setPartCode: (params) => {
        return createAction(SET_PART_CODE, params)
    },
    setReplace: (params) => {
        return createAction(SET_REPLACE, params);
    }
};
