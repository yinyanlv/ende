import {createAction} from '@/common/utils';

export const SET_USER_DATA = 'auth:set-user-data';


export const authCreator = {
    setUserData: (data) => {
        return createAction(SET_USER_DATA, data);
    }
};