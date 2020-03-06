import {createAction} from '@/common/utils';

export const SET_IS_LOADING = 'print-legend:set-is-loading';
export const LOAD_PARTS = 'print-legend:load-parts';
export const SET_PARTS = 'print-legend:set-parts';

export const printLegendCreator = {
    setIsLoading: (params) => {
        return createAction(SET_IS_LOADING, params);
    },
    loadParts: (params) => {
        return createAction(LOAD_PARTS, params);
    },
    setParts: (params) => {
        return createAction(SET_PARTS, params);
    }
};