import {mock} from '../mock';
import {API_PREFIX} from '@/config';

const brands = [{
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

const conditions = [{
    code: 'm3',
    name: '年款',
    list: [{
        code: 'abc',
        name: '2019',
        lvl: 3
    }]
}, {
    code: 'm4',
    name: '车型',
    list: [{
        code: 'abc',
        name: 'SD - 精英型(LV2)',
        lvl: 4
    }]
}];

// 加载品牌
mock.onGet(API_PREFIX + '/mapping/main').reply((req) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve([200, {
                    success: true,
                    result: brands
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

// 加载条件
mock.onGet(/\/api\/mapping\/next.+/).reply((req) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve([200, {
                    success: true,
                    result: conditions
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
