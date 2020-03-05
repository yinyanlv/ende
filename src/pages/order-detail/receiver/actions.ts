import {createAction} from '@/common/utils';

export const SET_INFO = 'order-detail:receiver:set-info';

export const receiverCreator = {
    setInfo: (params) => {
        return createAction(SET_INFO, params);
    }
};
