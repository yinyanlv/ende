import {createAction} from '@/common/utils';

export const SET_INFO = 'order-detail:purchaser:set-info';

export const purchaserCreator = {
    setInfo: (params) => {
        return createAction(SET_INFO, params);
    }
};
