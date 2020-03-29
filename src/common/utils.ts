import queryString from 'query-string';
import history from '@/common/history';
import {defaultCode} from '@/pages/common/crumbs/reducer';

export function createAction(type, payload?) {
    return {
        type,
        payload
    };
}

export function updateLocationSearch(params = {}) {
    const pageSearchType = getPageSearchType();

    if (pageSearchType.type === 'vin' || pageSearchType.type === 'vsn') {
        history.push(Object.assign(history.location, {
            search: queryString.stringify(Object.assign(params, pageSearchType))
        }));
    } else {
        history.push(Object.assign(history.location, {
            search: queryString.stringify(params)
        }));
    }
}

export function updateLocationHash(params = {}) {
    history.push(Object.assign(history.location, {
        hash: queryString.stringify(params)
    }));
}

export function getQueryObj() {

    return queryString.parse(history.location.search);
}

export function getMQueryObj() {
    const queryObj = queryString.parse(history.location.search);
    let result = {};

    Object.keys(queryObj).forEach((key) => {
        if (key.startsWith('m_')) {
            result[key] = queryObj[key];
        }
    });

    return result;
}

export function getSQueryObj() {
    const queryObj = queryString.parse(history.location.search);
    let result = {};

    Object.keys(queryObj).forEach((key) => {
        if (key.startsWith('s_')) {
            result[key] = queryObj[key];
        }
    });

    return result;
}

export function getHashObj() {
    if (history.location.hash) {
        return queryString.parse(history.location.hash.replace(/#/g, ''));
    } else {
        return null;
    }
}

/**
 *  filters: [{name: 'abc', value: ''}],
 *  sorts: [{field: 'abc', asc: true}],
 *  paging: {page: 1, size: 10}
 *
 *  {total: 111, list: [{}], pageSize: 0, totalPage: 1, pageNo: 0}
 */
export function buildQueryParams(params = [], page = 1, size = 10, sorts: any[] = []) {
    return {
        filters: params,
        sorts: sorts,
        paging: {
            page,
            size
        }
    }
}

export function rebuildFieldsToFilters(fieldsObj) {
    const list: any = [];

    Object.keys(fieldsObj).forEach((key) => {
        let value = fieldsObj[key];

        if (typeof(value) === 'string') {
            value = value.trim();
        }

        if (value !== undefined && value !== null && value !== '') {
            list.push({
                name: key,
                value
            });
        }
    });

    return list;
}

export function rebuildListToOptions(list, isLeaf = false, labelWithCode = false) {
    return list.map((item) => {
        return {
            value: item.code,
            label: labelWithCode ? `${item.code} - ${item.name}` : item.name,
            isLeaf: isLeaf
        };
    });
}

export function getPageSearchType(): any {
    const queryObj = queryString.parse(history.location.search);

    return {
        type: queryObj.type || 'normal',
        code: queryObj.code || null
    };
}

export function getUrlAndParams(urlMap, params) {

    const searchType = getPageSearchType();
    const newParams = Object.assign({}, params);
    let url = urlMap.normal;

    if (searchType.type === 'vin') {
        url = urlMap.vin;
        newParams.vin = searchType.code;
    } else if (searchType.type === 'vsn') {
        url = urlMap.vsn;
        newParams.vsn = searchType.code;
    }

    return {
        url,
        params: newParams
    };
}

export function getQueryObjFromRecord(record) {
    if (!record) {
        record = {};
    }
    return {
        m_1: record.m1 || defaultCode,
        m_2: record.m2 || defaultCode,
        m_3: record.m3 || defaultCode,
        m_4: record.m4 || defaultCode,
        s_1: record.s1 || defaultCode,
        s_2: record.s2 || defaultCode
    };
}

export function isAtPateUsage(): boolean {
    return window.location.pathname === '/usage' ? true : false;
}

