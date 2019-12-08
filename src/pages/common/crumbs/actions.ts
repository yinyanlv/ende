import {createAction} from '@/common/utils';

export const LOAD_CRUMBS = 'crumbs:load-crumbs';
export const SET_CRUMBS = 'crumbs:set-crumbs';

export const crumbsCreator = {
    request: (params) => {
        return createAction(LOAD_CRUMBS, params);
    },
    setCrumbs: (data) => {
        return createAction(SET_CRUMBS, data);
    }
};