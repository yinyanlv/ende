import {createAction} from '@/common/utils';

export const IS_SHOW_VIN_DETAIL = 'vin-detail:is-show-vin-detail';

export const vinDetailCreator = {
    setIsShowVinDetail: (params) => {
        return createAction(IS_SHOW_VIN_DETAIL, params);
    }
};
