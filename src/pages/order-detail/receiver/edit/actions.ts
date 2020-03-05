import {createAction} from '@/common/utils';

export const SET_IS_SHOW_EDIT = 'order-detail:receiver:edit:set-is-show-edit';
export const SET_FIELDS_VALUE = 'order-detail:receiver:edit:set-fields-value';
export const CREATE_RECORD = 'order-detail:receiver:edit:create-record';
export const EDIT_RECORD = 'order-detail:receiver:edit:edit-record';

export const editCreator = {
    setIsShowEdit: (params) => {
      return createAction(SET_IS_SHOW_EDIT, params);
    },
    setFieldsValue: (params) => {
        return createAction(SET_FIELDS_VALUE, params);
    },
    createRecord: (params) => {
        return createAction(CREATE_RECORD, params);
    },
    editRecord: (params) => {
        return createAction(EDIT_RECORD, params);
    }
};
