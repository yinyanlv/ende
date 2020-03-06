import {createAction} from '@/common/utils';

export const SET_IS_SHOW = 'order-detail:import-file:set-is-show';
export const SET_IS_UPLOADING = 'order-detail:import-file:set-is-uploading';
export const IMPORT_FILE  = 'order-detail:import-file:import-file';
export const DOWNLOAD_TPL  = 'order-detail:import-file:download-tpl';

export const importFileCreator = {
    setIsShow: (params) => {
      return createAction(SET_IS_SHOW, params);
    },
    setIsUploading: (params) => {
        return createAction(SET_IS_UPLOADING, params);
    },
    importFile: (params) => {
        return createAction(IMPORT_FILE, params);
    },
    downloadTpl: () => {
        return createAction(DOWNLOAD_TPL);
    }
};
