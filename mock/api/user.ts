import jwt from 'jsonwebtoken';
import {mock} from '../mock';
import {API_PREFIX} from '@/config';

const jwtConfig = {
    secret: 'xiu',
    expiresIn: '1 days'  // 单位秒，如果使用字符串，可定义为days, hours等
};

const userDb = [{
    username: 'admin',
    password: '111111',
    role: 'admin'
}];

const userConfig = {
    knowledgeJsonpUrl: "",
    oemCode: "SGMW",
    stm: 1575527282338,
    resHost: "http://res2.dev.servision.com.cn/epc",
    pacUrl: "http://maxus.pac.container.dev.servision.com.cn"
};

mock.onPost(API_PREFIX + '/login').reply((req) => {
    const params = JSON.parse(req.data);

    const users = userDb.filter((item) => {
        if (item.username === params.username && item.password === params.password) {
            return true;
        } else {
            return false;
        }
    });
    const isValid = users.length ? true : false;
    let result;

    if (isValid) {
        const temp = Object.assign({accessToken: jwt.sign({username: users[0].username}, jwtConfig.secret, {expiresIn: jwtConfig.expiresIn})}, users[0]);
        result = {
            success: true,
            result: temp
        };
    } else {
        result = {
            success: false,
            message: '用户名或密码错误'
        };
    }

    return [200, result];
});

mock.onGet(API_PREFIX + '/sys/config').reply((req) => {
    try {
        const updatedAccessToken = jwt.sign({
            username: 'admin'
        }, jwtConfig.secret, {expiresIn: jwtConfig.expiresIn});

        const users = userDb.filter((item) => {
            if (item.username === 'admin') {
                return true;
            } else {
                return false;
            }
        });
        const temp = Object.assign(userConfig, {
            accessToken: updatedAccessToken,
            userInfo: users[0]
        });

        return [200, {
            success: true,
            result: temp
        }];
    } catch (err) {
        const message = 'Invalid access token!';

        return [401, {
            success: false,
            message
        }];
    }
});
