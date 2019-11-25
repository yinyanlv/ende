## 按组件加载antd组件样式并定制主题样式
```shell script
yarn add babel-plugin-import react-app-rewired customize-cra less less-loader --dev
```

## 针对ts文件定义路径别名
```text
步骤一：项目根目录下添加.env文件， 添加配置项NODE_PATH=./（用于node编译时定位）
步骤二：项目根目录下添加tsconfig.paths.json，定义路径别名，并在tsconfig.json中继承配置项（用于node+IDE，不能直接在tsconfig.json中定义，会被cra重写，只能通过继承配置项的方式定义路径别名）
```

## 配置webstorm按根路径查找scss文件
```text
右键项目根目录 -> Mark Directory as -> Resource Root（也可以定义webpack.config.js，但是对于webstorm似乎无效）
```