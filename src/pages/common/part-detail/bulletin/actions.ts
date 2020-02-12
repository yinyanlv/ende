import {createAction} from '@/common/utils';

export const LOAD_BULLETIN = 'part-detail:bulletin:load-bulletin';
export const SET_BULLETIN = 'part-detail:bulletin:set-bulletin';

export const bulletinCreator = {
    loadBulletin: (params) => {
        return createAction(LOAD_BULLETIN, params);
    },
    setBulletin: (params) => {
        return createAction(SET_BULLETIN, params);
    }
};