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

export function getCleanQueryObj() {
    const queryObj = queryString.parse(history.location.search);
    let result = {};

    Object.keys(queryObj).forEach((key) => {
        if (!key.startsWith('s_')) {
            result[key] = queryObj[key];
        }
    });

    return result;
}