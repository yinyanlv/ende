import {createAction} from '@/common/utils';
import {defaultCode} from './reducer';

export const LOAD_CRUMBS = 'crumbs:load-crumbs';
export const SET_CRUMBS = 'crumbs:set-crumbs';

export const crumbsCreator = {
    load: (params) => {
        return createAction(LOAD_CRUMBS, rebuildParams(params));
    },
    setCrumbs: (data) => {
        return createAction(SET_CRUMBS, data);
    }
};

function rebuildParams(params) {
    if (params) {
        if (!params.m_1) {
            params.m_1 = defaultCode;
        }

        if (!params.m_2) {
            params.m_2 = defaultCode;
        }

        if (!params.m_3) {
            params.m_3 = defaultCode;
        }

        if (!params.m_4) {
            params.m_4 = defaultCode;
        }
    }

    return params;
}
