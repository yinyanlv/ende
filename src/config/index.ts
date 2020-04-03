export const config: any = {};

const apiMode = process.env.REACT_APP_API_MODE;

if (apiMode === 'test') {
    config.apiPrefix = 'http://miniepc.dev.servision.com.cn/api';
} else if (apiMode === 'production') {
    config.apiPrefix = 'http://miniepc.servision.com.cn/api';
} else {
    config.apiPrefix = 'http://miniepc.dev.servision.com.cn/api';
}

export const API_PREFIX = config.apiPrefix;
