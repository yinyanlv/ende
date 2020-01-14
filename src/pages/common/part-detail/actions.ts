import {createAction} from '@/common/utils';

export const IS_SHOW_PART_DETAIL = 'part-detail:is-show-part-detail';

export const partDetailCreator = {
    setIsShowPartDetail: (params) => {
        return createAction(IS_SHOW_PART_DETAIL, params);
    }
};
