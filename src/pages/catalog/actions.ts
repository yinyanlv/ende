import {createAction} from '@/common/utils';

export const LOAD_BRANDS = 'catalog:load-brands';
export const LOAD_BRANDS_SUCCESS = 'catalog:load-brands-success';
export const LOAD_BRANDS_FAILED = 'catalog:load-brands-failed';

export const loadBrandsActionCreator = {
    request: () => {
        return createAction(LOAD_BRANDS);
    },
    success: (data) => {
        return createAction(LOAD_BRANDS_SUCCESS, data);
    },
    failed: (message) => {
        return createAction(LOAD_BRANDS_FAILED, message);
    }
};
