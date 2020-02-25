import queryString from 'query-string';
import history from '@/common/history';

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
export function buildQueryParams(params = [], page = 1, size = 10) {
    return {
        filters: params,
        sorts: [],
        paging: {
            page,
            size
        }
    }
}

export function rebuildFieldsToFilters(fieldsObj) {
    const list: any = [];

    Object.keys(fieldsObj).forEach((key) => {
        const value = fieldsObj[key];
        if (value !== undefined && value !== null && value !== '') {
            list.push({
                name: key,
                value
            });
        }
    });

    return list;
}

export function rebuildListToOptions(list, isLeaf = false) {
    return list.map((item) => {
        return {
            value: item.code,
            label: item.name,
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
    let url = urlMap.normal;

    if (searchType.type === 'vin') {
        url = urlMap.vin;
        params.vin = searchType.code;
    } else if (searchType.type === 'vsn') {
        url = urlMap.vsn;
        params.vsn = searchType.code;
    }

    return {
        url,
        params
    };
}
