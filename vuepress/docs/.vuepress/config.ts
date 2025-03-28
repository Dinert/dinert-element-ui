
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
  plugins: [
    [
        "vuepress-plugin-typescript",
        {
            tsLoaderOptions: {
            }
        }
    ],
    'demo-container' as any,
//     ['vuepress-plugin-container', {
//         type: 'tip',
//         defaultTitle: '提示22',
//         before: (info: string) => {
//             console.log(info, 'incoo')
//             return `<
// `;
//         },
//         after: () => {
//             return `
//             </div>`;
//         }
//     }]
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
    },
  },
  chainWebpack: (config) => {
  }
})