import {createAction} from '@/common/utils';

export const REPLACE_SEARCH = 'search:replace:replace-search';

export const replaceCreator = {
    searchReplace: (params) => {
        return createAction(REPLACE_SEARCH, params);
    }
};
