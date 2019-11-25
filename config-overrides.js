const path = require('path');
const {override, addWebpackAlias, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
    addWebpackAlias({
        ['@']: path.resolve(__dirname, 'src')
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'  // 设置为true时，将导入less而不是css
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            // '@primary-color': 'red'
        }
    })
);