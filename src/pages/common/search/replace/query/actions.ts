import {createAction} from '@/common/utils';

export const DO_QUERY = 'search:replace:do-query';

export const queryCreator = {
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    }
};
