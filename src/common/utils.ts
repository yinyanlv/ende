import queryString from 'query-string';
import history from '@/common/history';

export function createAction(type, payload?) {
    return {
        type,
        payload
    }
}

export function updateLocationSearch(params = {}) {
    history.push(Object.assign(history.location, {
        search: queryString.stringify(params)
    }));
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
