import queryString from 'query-string';
import history from '@/common/history';

export function createAction(type, payload?) {
    return {
        type,
        payload
    }
}

export function updateLocationSearch(params = {}, options?) {

    let queryObj = queryString.parse(history.location.search);

    Object.assign(queryObj, params);

    history.push(Object.assign(history.location, {
        search: queryString.stringify(queryObj)
    }));
}
