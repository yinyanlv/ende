import {createAction} from '@/common/utils';

export const DO_QUERY = 'search:advance-search:applicability:do-query';
export const SET_APPLICABILITY = 'search:advance-search:applicability:set-applicability';

export const applicabilityCreator = {
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    },
    setApplicability: (params) => {
        return createAction(SET_APPLICABILITY, params);
    }
};