import {createAction} from '@/common/utils';

export const SET_IS_SHOW_UPLOAD = 'order-detail:upload:set-is-show-upload';
export const SET_IS_UPLOADING = 'order-detail:upload:set-is-uploading';
export const DOWNLOAD_TEMPLATE = 'order-detail:upload:download-template';
export const UPLOAD_FILE = 'order-detail:upload:upload-file';

export const uploadCreator = {
    setIsShowUpload: (params) => {
      return createAction(SET_IS_SHOW_UPLOAD, params);
    },
    setIsUploading: (params) => {
        return createAction(SET_IS_UPLOADING, params);
    },
    downloadTemplate: () => {
        return createAction(DOWNLOAD_TEMPLATE);
    },
    uploadFile: (params) => {
        return createAction(UPLOAD_FILE, params);
    }
};
