
import path from "path";
import { defineConfig } from "vuepress/config";

function _resolve(dir: string) {
    return path.resolve(__dirname, dir)
}
export default defineConfig({
  title: 'dinert-element-ui',
  description: 'VuePress搭建基于Element的组件库二次封装的文档教程示例代码',
  port: 3113,
  plugins: [
    'demo-container' as any,
    [
        "vuepress-plugin-typescript",
        {
            tsLoaderOptions: {
            }
        }
    ]
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
        link: '/components/form/basic'
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
        "/components/": [
            {
                title: '表单',
                collapsable: true,
                children: [
                    {
                        title: '基本使用',
                        path: '/components/form/basic',
                    }
                ]
            },
        ]
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@packages': _resolve('../../../packages'),
        '@vuepress': _resolve('../../../vuepress'),
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
    }
  }

})