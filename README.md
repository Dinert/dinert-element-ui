# 基于Vue二次封装的element-ui组件

## 技术栈
<a href="https://github.com/vuejs/vue/tree/v2.6.14">
  <img src="https://img.shields.io/badge/vue-2.16.4-brightgreen" alt="vue">
</a>
<a href="https://element.eleme.io/#/zh-CN/component/installation">
  <img src="https://img.shields.io/badge/element--ui-2.15.8-blue" alt="vue">
</a>

## 目录
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
## 安装
* 使用npm
```shell
npm i @dinert/element-ui --save
```
* 使用yarn
```shell
yarn add @dinert/element-ui
```
## 简述
* 基于Vue二次封装的element-ui组件库，打包成esm、umd、cjs可供浏览器外链、vue的import、node的required的使用形式
* 在封装时保留原有UI框架的属性和方法，可以较好的扩展自定义属性
## 使用

### d-form组件
#### [form-item](https://element.eleme.io/#/zh-CN/component/form#form-item-attributes) 属性 — Object
* `form-item`属性，如下代码第一层为对象，type和name代表的是element-ui框架中`form-item`属性的prop。第二层也是对象，对象中type代表的是组件类型，对象中其它属性为element-ui框架中的[form-item]的属性，第三层为options对象，这个对象下的属性代表的是每个组件中的属性。
* 第二层对象中的属性是[form-item]，那么方法就在第二层属性加上一个on对象，on对象指的就是当前组件属性的方法
* 那么第三层对象中组件的方法该怎么去绑定呢，比如下面的type为[select](https://element.eleme.io/#/zh-CN/component/select#select-attributes)的组件，options代表[select](https://element.eleme.io/#/zh-CN/component/select#select-attributes)组件中所有的属性，options.on就是绑定了[select](https://element.eleme.io/#/zh-CN/component/select#select-attributes)e组件的所有方法，当[select](https://element.eleme.io/#/zh-CN/component/select#select-attributes)变化时会触发change事件。
```js
formItem: {
  type: {
    type: 'select',
    label: '窗口类型',
    options: {
      on: {
        change() {

        },
      },
      options: [
        { value: '一口受理', label: '一口受理'
        },
        { value: '综合窗口', label: '综合窗口'
        },
        { value: '企业帮办', label: '企业帮办'
        },
        { value: '专窗', label: '专窗'
        },
        { value: '咨询台', label: '咨询台'
        },
      ],
    }
  },
  name: {
    type: 'input',
    label: '姓名',
    options: {}
  }
}
```

#### [form](https://element.eleme.io/#/zh-CN/component/form#form-attributes) 属性 — Object
* form属性指的是element-ui中form的属性
* form的方法指的是form.on对象中的方法
#### [row](https://element.eleme.io/#/zh-CN/component/layout#row-attributes) 属性 — Object
* row属性指的是element-ui中row的属性
#### [colLayout](https://element.eleme.io/#/zh-CN/component/layout#col-attributes) 属性 — Object
* colLayout属性指的是element-ui中row的属性
#### isSearch 属性 — Boolean
* 判断是否显示右边搜索栏，默认为true

### d-table组件

#### showHeader 属性 — Boolean
* 是否显示表格上方的过滤选项，默认为true
#### showFooter 属性 — Boolean
* 是否显示表格下方的分页，默认为true
#### [table](https://element.eleme.io/#/zh-CN/component/table#table-attributes) 属性 — Object
* table下的属性为[table](https://element.eleme.io/#/zh-CN/component/table#table-attributes)中所有的属性
* table.on为[table](https://element.eleme.io/#/zh-CN/component/table#table-events)的方法和事件
* table.tableColumn为[table-column](https://element.eleme.io/#/zh-CN/component/table#table-column-attributes)的所有属性
```js      
table: {
  tableColumn: [
    {
      type: 'selection',
      width: 55,
      align: 'center',
      label: '选择'
    },
    {
      prop: 'type',
      label: '窗口类型',
      children: [
        {
          prop: 'type1',
          label: '类型A',
          children: [
            {
              prop: 'type-a',
              label: '类型AB'
            },
            {
              prop: 'type4',
              label: '类型AC'
            },
          ]
        },
        {
          prop: 'type2',
          label: '类型B'
        }
      ]
    },
    {
      prop: 'name',
      label: '姓名',
    },
    {
      prop: 'code',
      label: '工号'
    },
    {
      prop: 'department',
      label: '部门'
    },
    {
      prop: 'enable',
      label: '大屏显示'
    },
    {
      prop: 'operations',
      label: '操作'
    }
  ],
  data: [
    {
    'name': 'pppppppppp',
    'type-a': 'a3123123'
    },
    {
    'name': 'pppppppppp',
    'type-a': 'a3123123'
    }
  ]
}
```

#### disabled 属性 — Boolean
* 是否禁用所有的操作，默认为false

#### [pagination](https://element.eleme.io/#/zh-CN/component/pagination#attributes) 属性 — Object
* pagination下的属性为[pagination](https://element.eleme.io/#/zh-CN/component/pagination#attributes)中所有的属性
* pagination.on对象为[pagination](https://element.eleme.io/#/zh-CN/component/pagination#events)的方法和事件

#### tableSlot 属性 — Boolean
* tableSlot是表格插槽属性，默认为false
* 如果为true则不能用#column_type的名称去渲染表格中的数据，这样插槽的名称为#default。
* tableSlot为true时适用于二次封装表格

### d-table-page组件
#### d-table-page其实是d-form和d-table的结合体，抽取常用属性在这个组件中，属性配置请参考d-form和d-table，属性如下

#### [form-item](https://element.eleme.io/#/zh-CN/component/form#form-item-attributes) 属性 — Object
#### [form](https://element.eleme.io/#/zh-CN/component/form#form-attributes) 属性 — Object
#### [table](https://element.eleme.io/#/zh-CN/component/table#table-attributes) 属性 — Object
#### tableSlot 属性 — Boolean
#### [pagination](https://element.eleme.io/#/zh-CN/component/pagination#attributes) 属性 — Object
#### [colLayout](https://element.eleme.io/#/zh-CN/component/layout#col-attributes) 属性 — Object
#### disabled 属性 — Boolean
#### showHeader 属性 — Boolean
#### showSearch 属性 — Boolean