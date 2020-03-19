import {createAction} from '@/common/utils';

export const LOAD_APPLICABILITY = 'part-detail:applicability:load-applicability';
export const SET_APPLICABILITY = 'part-detail:applicability:set-applicability';
export const SET_SELECTED_KEYS = 'part-detail:applicability:set-selected-keys';

export const applicabilityCreator = {
    loadApplicability: (params) => {
        return createAction(LOAD_APPLICABILITY, params);
    },
    setApplicability: (params) => {
        return createAction(SET_APPLICABILITY, params);
    },
    setSelectedKeys: (params) => {
        return createAction(SET_SELECTED_KEYS, params);
    }
};
