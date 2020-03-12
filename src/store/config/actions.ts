import {createAction} from '@/common/utils';

export const SET_CONFIG = 'config:set-config';
export const SET_MAX_Z_INDEX = 'config:set-max-z-index';

export const configCreator = {
    setConfig: (data) => {
        return createAction(SET_CONFIG, data);
    },
    setMaxZIndex: (data) => {
        return createAction(SET_MAX_Z_INDEX, data);
    }
};

