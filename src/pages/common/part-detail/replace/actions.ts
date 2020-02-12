import {createAction} from '@/common/utils';

export const LOAD_REPLACE = 'part-detail:replace:load-replace';
export const SET_REPLACE = 'part-detail:replace:set-replace';

export const replaceCreator = {
    loadReplace: (params) => {
        return createAction(LOAD_REPLACE, params);
    },
    setReplace: (params) => {
        return createAction(SET_REPLACE, params);
    }
};