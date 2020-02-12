import {createAction} from '@/common/utils';

export const LOAD_PART_INFO = 'part-detail:part-info:load-part-info';
export const SET_PART_INFO = 'part-detail:part-info:set-replace';

export const partInfoCreator = {
    loadPartInfo: (params) => {
        return createAction(LOAD_PART_INFO, params);
    },
    setPartInfo: (params) => {
        return createAction(SET_PART_INFO, params);
    }
};