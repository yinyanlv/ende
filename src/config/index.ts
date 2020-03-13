export const config: any = {};

const env = process.env.NODE_ENV;

if (env === 'test') {
    config.apiPrefix = 'http://192.168.1.71:8083/api';
} else if (env === 'production') {
    config.apiPrefix = 'http://192.168.1.71:8083/api';
} else {
    config.apiPrefix = 'http://192.168.1.71:8083/api';
    // config.apiPrefix = '/api';
}

export const API_PREFIX = config.apiPrefix;
