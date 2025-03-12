import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import {createVuePlugin} from 'vite-plugin-vue2'

export default defineUserConfig({
  title: 'dinert-element-ui',
  description: 'VuePress搭建基于Element的组件库二次封装的文档教程示例代码',
  bundler: viteBundler({
    viteOptions: {
      server: {
        port: 3125,
      },

    }
  }),
  theme: defaultTheme({
    repo: "https://github.com/Dinert/element-ui",
    navbar: [
      {
        text: '指南',
        link: '/guide/installation'
      },
      {
        text: '组件',
        link: '/components/'
      },
    ],
    sidebar: {
        "/guide/": [
            {
                text: '安装',
                link: '/guide/installation'
            },
            {
                text: '快速开始',
                link: '/guide/quickstart'
            },
        ]
    }
  }),
})