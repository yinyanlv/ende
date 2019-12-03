import {mock} from '../mock';
import jwt from 'jsonwebtoken';

const jwtConfig = {
    secret: 'xiu',
    expiresIn: '1 days'  // 单位秒，如果使用字符串，可定义为days, hours等
};

const userDb = [{
    username: 'admin',
    password: '111111',
    role: 'admin'
}];

mock.onPost('/api/login').reply((req) => {
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

mock.onGet('/api/access-token').reply((req) => {
    const data = JSON.parse(req.data);
    const {accessToken} = data;

    try {
        const info = jwt.verify(accessToken, jwtConfig.secret);
        const username = info['username'];
        const updatedAccessToken = jwt.sign({
            username: username
        }, jwtConfig.secret, {expiresIn: jwtConfig.expiresIn});

        const users = userDb.filter((item) => {
            if (item.username === username) {
                return true;
            } else {
                return false;
            }
        });
        const temp = Object.assign({
            accessToken: updatedAccessToken
        }, users[0]);

        return [200, {
            success: true,
            result: temp
        }];
    } catch(err) {
        const message = 'Invalid access token!';

        return [401, {
            success: false,
            message
        }];
    }
});
