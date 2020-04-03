const path = require('path');
const {override, addWebpackAlias, fixBabelImports, addLessLoader, removeModuleScopePlugin, babelInclude} = require('customize-cra');

module.exports = override(
    addWebpackAlias({
        ['@']: path.resolve(__dirname, 'src')
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true  // 设置为true时，将导入less而不是css
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#a61f38',
            '@heading-color': '#333',
            '@text-color': '#333'
        }
    }),
    removeModuleScopePlugin(),
    babelInclude([
        path.resolve('src')
    ])
);
