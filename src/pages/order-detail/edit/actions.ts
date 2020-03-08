import {createAction} from '@/common/utils';

export const SET_IS_SHOW_EDIT = 'order-detail:edit:set-is-show-edit';
export const SET_FIELDS_VALUE = 'order-detail:edit:set-fields-value';
export const EDIT_RECORD = 'order-detail:edit:edit-record';

export const editCreator = {
    setIsShowEdit: (params) => {
      return createAction(SET_IS_SHOW_EDIT, params);
    },
    setFieldsValue: (params) => {
        return createAction(SET_FIELDS_VALUE, params);
    },
    editRecord: (params) => {
        return createAction(EDIT_RECORD, params);
    }
};
