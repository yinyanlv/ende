import {createAction} from '@/common/utils';

export const SEARCH_APPLICABILITY_QUERY = 'search:applicability:query';
export const SET_APPLICABILITY_LIST = 'search:applicability:set-applicability-list';

export const searchApplicabilityCreator = {
    applicabilityQuery: (params) => {
        return createAction(SEARCH_APPLICABILITY_QUERY, params);
    },
    setApplicabilityList: (params) => {
        return createAction(SET_APPLICABILITY_LIST, params);
    }
};