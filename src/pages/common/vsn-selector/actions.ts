import {createAction} from '@/common/utils';

export const IS_SHOW_VSN_SELECTOR = 'vsn-selector:is-show-vsn-selector';

export const vsnSelectorCreator = {
    setIsShowVsnSelector: (params) => {
        return createAction(IS_SHOW_VSN_SELECTOR, params);
    }
};
