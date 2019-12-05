import {createAction} from '@/common/utils';

export const RESET_STATE = 'catalog:reset-state';

export const LOAD_BRANDS = 'catalog:load-brands';
export const LOAD_BRANDS_SUCCESS = 'catalog:load-brands-success';
export const LOAD_BRANDS_FAILED = 'catalog:load-brands-failed';
export const LOAD_BRANDS_SET_ACTIVE = 'catalog:load-brands-set-active';

export const LOAD_CONDITIONS = 'catalog:load-conditions';
export const LOAD_CONDITIONS_BEFORE = 'catalog:load-conditions-before';
export const LOAD_CONDITIONS_SUCCESS = 'catalog:load-conditions-success';
export const LOAD_CONDITIONS_FAILED = 'catalog:load-conditions-failed';

export const catalogCreator = {
    resetState: () => {
        return createAction(RESET_STATE);
    }
};

export const loadBrandsCreator = {
    request: () => {
        return createAction(LOAD_BRANDS);
    },
    success: (data) => {
        return createAction(LOAD_BRANDS_SUCCESS, data);
    },
    failed: (message) => {
        return createAction(LOAD_BRANDS_FAILED, message);
    },
    setActive: (data) => {
        return createAction(LOAD_BRANDS_SET_ACTIVE, data);
    }
};

export const loadConditionsCreator = {
    beforeRequest: () => {
        return createAction(LOAD_CONDITIONS_BEFORE);
    },
    request: (brandCode) => {
        return createAction(LOAD_CONDITIONS, brandCode);
    },
    success: (data) => {
        return createAction(LOAD_CONDITIONS_SUCCESS, data);
    },
    failed: (message) => {
        return createAction(LOAD_CONDITIONS_FAILED, message);
    }
};
