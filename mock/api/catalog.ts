import {mock} from '../mock';

const brands = [{
    code: 'sgmw1',
    name: '五菱',
    list: [{
        code: '1',
        name: 'CN150M - 五菱宏光PLUS',
        src: '/images/CN150M.gif'
    }]
}, {
    code: 'sgmw2',
    name: '宝骏',
    list: [{
        code: '1',
        name: 'CN113 - 五菱宏光S1',
        src: '/images/CN113.gif'
    }]
}];

mock.onGet('/api/load-brands').reply((req) => {

    try {
        return [200, {
            success: true,
            result: brands
        }];
    } catch(err) {
        const message = 'Invalid access token!';

        return [401, {
            success: false,
            message
        }];
    }
});
