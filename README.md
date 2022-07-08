# 基于Vue二次封装的element-ui组件

## 技术栈
<a href="https://github.com/vuejs/vue/tree/v2.6.14">
  <img src="https://img.shields.io/badge/vue-2.16.4-brightgreen" alt="vue">
</a>
<a href="https://element.eleme.io/#/zh-CN/component/installation">
  <img src="https://img.shields.io/badge/element--ui-2.15.8-blue" alt="vue">
</a>

## 文件目录
```

│  .babelrc
│  .gitignore
│  index.html
│  package-lock.json
│  package.json
│  README.md
│  rollup.config.build.js
│  rollup.config.dev.js
│  yarn-error.log
│  yarn.lock
│
├─packages
│  ├─d-form
│  │  │  index.js
│  │  │
│  │  └─src
│  │          index.vue
│  │
│  ├─d-overflow-tooltip
│  │  │  index.js
│  │  │
│  │  └─src
│  │          index.vue
│  │
│  ├─d-table
│  │  │  index.js
│  │  │
│  │  └─src
│  │          index.vue
│  │          recuve-table-column.vue
│  │
│  └─d-table-page
│      │  index.js
│      │
│      └─src
│              index.vue
│
└─src
    │  index.js
    │
    └─utils
            getValue.js
            tools.js
```
## 如何安装
* 如果你使用npm
```shell
npm i @dinert/element-ui --save
```
* 或者使用yarn
```shell
yarn add @dinert/element-ui
```
## 简述
* 基于Vue二次封装的element-ui组件库，打包成esm、umd、cjs可供浏览器外链、vue的import、node的required的使用形式
* <strong>使用的注意事项</strong>
  1. 在使用的过程中用到函数的几个配置项有`formItem[prop].on、form.on、table.on、table.tableColumn[prop].on、pagination.on...`
  2. 在使用过程中有什么疑问或者修改意见请联系作者

## 使用

### d-form
* form-item
```js

```

