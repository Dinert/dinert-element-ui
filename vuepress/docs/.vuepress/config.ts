
import path from "path";
import { defineConfig } from "vuepress/config";

function _resolve(dir: string) {
    return path.resolve(__dirname, dir)
}

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/dinert-element-ui/' : '/' as any,
  title: 'dinert-element-ui',
  description: 'VuePress搭建基于Element的组件库二次封装的文档教程示例代码',
  port: 3113,
  locales: {
    '/': {
        lang: 'zh-CN',
        title: 'dinert-element-ui',
        description: 'VuePress搭建基于Element的组件库二次封装的文档教程示例代码',
    }

  },
  plugins: [
    [
        "vuepress-plugin-typescript",
        {
            tsLoaderOptions: {
            }
        }
    ],
    'demo-container' as any,
  ],
  themeConfig: {
    repo: "https://github.com/Dinert/dinert-element-ui",
    nav: [
      {
        text: '指南',
        link: '/guide/installation'
      },
      {
        text: '组件',
        link: '/examples/form/basic'
      },
    ],
    sidebar: {
        "/guide/": [
            {
                title: '安装',
                path: '/guide/installation'
            },
            {
                title: '快速开始',
                path: '/guide/quickstart'
            },
        ],
        "/examples/": [
            {
                title: '表单',
                collapsable: true,
                children: [
                    {
                        title: '基本使用',
                        path: '/examples/form/basic',
                    },
                    {
                        title: 'input 输入框',
                        path: '/examples/form/input',
                    },
                    {
                        title: 'input-number 数字输入框',
                        path: '/examples/form/input-number',
                    },
                    {
                        title: 'select 选择器',
                        path: '/examples/form/select',
                    },
                    {
                        title: 'switch 开关',
                        path: '/examples/form/switch',
                    },
                    {
                        title: 'date 日期选择器（时、日、周、月、年）',
                        path: '/examples/form/date',
                    },
                    {
                        title: 'radio 单选框',
                        path: '/examples/form/radio',
                    },
                    {
                        title: 'checkbox 多选框',
                        path: '/examples/form/checkbox',
                    },
                    {
                        title: 'rate 评分',
                        path: '/examples/form/rate',
                    },
                    {
                        title: 'cascader 级联选择器',
                        path: '/examples/form/cascader',
                    },
                    {
                        title: 'slider 滑块',
                        path: '/examples/form/slider',
                    },
                    {
                        title: 'time-picker 时间选择器',
                        path: '/examples/form/time-picker',
                    },
                    {
                        title: '表单属性',
                        path: '/examples/form/explain',
                    }
                ]
            },
            {
                title: '表格',
                collapsable: true,
                children: [
                    {
                        title: '基本使用',
                        path: '/examples/table/basic',
                    },
                    // {
                    //     title: '表格属性',
                    //     path: '/examples/table/explain',
                    // }
                ]
            }
        ]
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@vuepress': _resolve('../../../vuepress'),
        '@packages': _resolve('../../../packages'),
        'vue': _resolve('../../node_modules/vue')

      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-typescript',
                  '@vue/babel-preset-jsx' // 处理 Vue 2 TSX
                ]
              }
            }
          ]
        },
      ]
    }
  },

  chainWebpack: (config) => {

  }
})