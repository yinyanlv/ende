import {createAction} from '@/common/utils';

export const DO_QUERY = 'shopping-cart:query:do-query';

export const queryCreator = {
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    },
};
