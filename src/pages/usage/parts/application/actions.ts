import {createAction} from '@/common/utils';

export const IS_LOADING = 'usage:parts:is-loading';
export const LOAD_APPLICATION = 'usage:parts:load-application';
export const SET_APPLICATION = 'usage:parts:set-application';

export const applicationCreator = {
    setIsLoading: (params) => {
        return createAction(IS_LOADING, params);
    },
    loadApplication: (params) => {
        return createAction(LOAD_APPLICATION, params);
    },
    setApplication: (params) => {
        return createAction(SET_APPLICATION, params);
    }
};
