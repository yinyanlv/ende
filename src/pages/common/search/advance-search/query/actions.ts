import {createAction} from '@/common/utils';

export const ADVANCE_SEARCH_QUERY = 'search:advance-search:query';

export const advanceSearchQueryCreator = {
    query: (params) => {
        return createAction(ADVANCE_SEARCH_QUERY, params);
    }
};
