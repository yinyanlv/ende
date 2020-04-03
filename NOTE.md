## 按组件加载antd组件样式并定制主题样式
```text
1、yarn add babel-plugin-import react-app-rewired customize-cra less less-loader --dev
2、新增config-overrides.js，增加配置项fixBabelImports、addLessLoader
```

## 针对ts文件定义路径别名
```text
1、项目根目录下添加tsconfig.base.json，定义路径别名，并在tsconfig.json中继承配置项（用于node+IDE，不能直接在tsconfig.json中定义，会被cra重写，只能通过继承配置项的方式定义路径别名）
2、修改config-overrides.js，增加配置项addWebpackAlias
```

## 配置webstorm按根路径查找scss文件
```text
右键项目根目录 -> Mark Directory as -> Resource Root（也可以定义webpack.config.js，但是对于webstorm似乎无效）
```

## 增加自定义.d.ts
```text
tsconfig.base.json增加配置项
"typeRoots": [
  "./node_modules/@types",
  "./typings"
]
```

## 允许obj['abc']
```text
tsconfig.base.json增加配置项
"suppressImplicitAnyIndexErrors": true
```

## 允许隐式any
```text
tsconfig.base.json增加配置项
"noImplicitAny": false
```

## 允许隐式this
```text
tsconfig.base.json增加配置项
"noImplicitThis": false
```

## 需要另行安装.d.ts的部分常用库
```text
@types/react-redux 
@types/react-router-dom  
@types/react-router-config
@types/react-transition-group
```

## Module not found: You attempted to import ../mock which falls outside of the project src/ directory. Relative imports outside of src/ are not supported.
```text
config-overrides.js增加配置removeModuleScopePlugin
```

## cross-env不可以使用&&

## typescript默认不支持多层级生成器
```text
tsconfig.json修改配置，downlevelIteration: true
```
