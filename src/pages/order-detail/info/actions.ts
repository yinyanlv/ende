import {createAction} from '@/common/utils';

export const SET_FIELDS_VALUE = 'order-detail:info:set-fields-value';
export const LOAD_TRANSPORT = 'order-detail:info:load-transport';
export const SET_TRANSPORT = 'order-detail:info:set-transport';
export const LOAD_TYPE = 'order-detail:info:load-type';
export const SET_TYPE= 'order-detail:info:set-type';
export const LOAD_ORGANIZATION = 'order-detail:info:load-organization';
export const SET_ORGANIZATION = 'order-detail:info:set-organization';
export const LOAD_CHANNEL = 'order-detail:info:load-channel';
export const SET_CHANNEL = 'order-detail:info:set-channel';
export const LOAD_PRODUCT_GROUP = 'order-detail:info:load-product-group';
export const SET_PRODUCT_GROUP = 'order-detail:info:set-product-group';
export const LOAD_FACTORY = 'order-detail:info:load-factory';
export const SET_FACTORY = 'order-detail:info:set-factory';
export const LOAD_PLANNING = 'order-detail:info:load-planning';
export const SET_PLANNING = 'order-detail:info:set-planning';

export const infoCreator = {
    setFieldsValue: (params) => {
        return createAction(SET_FIELDS_VALUE, params);
    },
    loadTransport: () => {
        return createAction(LOAD_TRANSPORT);
    },
    setTransport: (list) => {
        return createAction(SET_TRANSPORT, list);
    },
    loadType: () => {
        return createAction(LOAD_TYPE);
    },
    setType: (list) => {
        return createAction(SET_TYPE, list);
    },
    loadOrganization: () => {
        return createAction(LOAD_ORGANIZATION);
    },
    setOrganization: (list) => {
        return createAction(SET_ORGANIZATION, list);
    },
    loadChannel: () => {
        return createAction(LOAD_CHANNEL);
    },
    setChannel: (list) => {
        return createAction(SET_CHANNEL, list);
    },
    loadProductGroup: () => {
        return createAction(LOAD_PRODUCT_GROUP);
    },
    setProductGroup: (list) => {
        return createAction(SET_PRODUCT_GROUP, list);
    },
    loadFactory: () => {
        return createAction(LOAD_FACTORY);
    },
    setFactory: (list) => {
        return createAction(SET_FACTORY, list);
    },
    loadPlanning: () => {
        return createAction(LOAD_PLANNING);
    },
    setPlanning: (list) => {
        return createAction(SET_PLANNING, list);
    }
};
