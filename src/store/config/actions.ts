import {createAction} from '@/common/utils';
export const SET_CONFIG = 'config:set-config';

export const configCreator = {
    setConfig: (data) => {
        return createAction(SET_CONFIG, data);
    }
};

