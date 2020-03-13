export const config: any = {};

const apiMode = process.env.REACT_APP_API_MODE;

if (apiMode === 'test') {
   config.apiPrefix = 'http://192.168.1.71:8083';
} else if (apiMode === 'prod') {
   config.apiPrefix = 'http://192.168.1.71:8083';
} else {
   config.apiPrefix = '/api';
}

export const API_PREFIX = config.apiPrefix;
