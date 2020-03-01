import {createAction} from '@/common/utils';

export const DO_QUERY = 'order-detail:cart:query:do-query';

export const queryCreator = {
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    }
};
