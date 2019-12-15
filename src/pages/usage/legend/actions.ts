import {createAction} from '@/common/utils';

export const SET_SVG_URI = 'usage:set-svg-uri';

export const legendCreator = {
    setSvgUrl: (params) => {
        return createAction(SET_SVG_URI, params);
    }
};