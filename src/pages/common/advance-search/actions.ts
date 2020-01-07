import {createAction} from '@/common/utils';

export const IS_SHOW_ADVANCE_SEARCH = 'advance-search:is-show-advance-search';

export const advanceSearchCreator = {
    setIsShowAdvanceSearch: (params) => {
        return createAction(IS_SHOW_ADVANCE_SEARCH, params);
    }
};
