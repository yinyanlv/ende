import {createAction} from '@/common/utils';

export const IS_SHOW_SEARCH = 'search:is-show-search';

export const searchCreator = {
    setIsShowSearch: (params) => {
        return createAction(IS_SHOW_SEARCH, params);
    }
};
