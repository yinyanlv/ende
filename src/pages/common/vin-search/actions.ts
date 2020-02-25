import {createAction} from '@/common/utils';

export const VIN_SEARCH = 'vin-search:vin-search';
export const VSN_SEARCH = 'vin-search:vsn-search';
export const VSN_SELECT_MODEL = 'vin-search:vsn-select-model';

export const vinSearchCreator = {
    doVinSearch: (params) => {
        return createAction(VIN_SEARCH, params);
    },
    doVsnSearch: (params) => {
        return createAction(VSN_SEARCH, params);
    },
    doVsnSelectModel: (params) => {
        return createAction(VSN_SELECT_MODEL, params);
    }
};
