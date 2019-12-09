import {mock} from '../mock';
import {API_PREFIX} from '@/config';

const group = [{
    code: 'sgmw1',
    name: '五菱',
    list: [{
        code: 'sgmw1-1',
        name: 'CN150M - 五菱宏光PLUS',
        src: '/images/CN150M.gif'
    }]
}, {
    code: 'sgmw2',
    name: '宝骏',
    list: [{
        code: 'sgmw2-1',
        name: 'CN113 - 五菱宏光S1',
        src: '/images/CN113.gif'
    }]
}];

// 加载分组
mock.onPost(API_PREFIX + '/usage').reply((req) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve([200, {
                    success: true,
                    result: group
                }]);
            } catch (err) {
                const message = 'Invalid access token!';

                reject([401, {
                    success: false,
                    message
                }]);
            }
        }, 1000);
    });
});


// 加载图例
mock.onPost(API_PREFIX + '/usage/struct/flat-descendant').reply((req) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve([200, {
                    success: true,
                    result: group
                }]);
            } catch (err) {
                const message = 'Invalid access token!';

                reject([401, {
                    success: false,
                    message
                }]);
            }
        }, 1000);
    });
});


// 加载配件
mock.onPost(API_PREFIX + '/usage/parts').reply((req) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve([200, {
                    success: true,
                    result: group
                }]);
            } catch (err) {
                const message = 'Invalid access token!';

                reject([401, {
                    success: false,
                    message
                }]);
            }
        }, 1000);
    });
});


