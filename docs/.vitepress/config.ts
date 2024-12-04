
import path from 'path'
import {defineConfig} from 'vitepress'

import vueJsx from '@vitejs/plugin-vue-jsx' // 添加这一句
import {mdPlugin} from './plugins/markdown-config'


function _resolve(dir: string) {
    return path.resolve(__dirname, dir)
}
export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '/dinert-element-ui/' : '/',
    vite: {
        resolve: {
            alias: {
                '@packages': _resolve('../../packages'),
                '@docs': _resolve('../../docs'),
            }
        },
        plugins: [
            vueJsx() as any,
        ],
        server: {
            port: 8922,
        }
    },

    themeConfig: {
        siteTitle: 'dinert-element-ui',
        nav: [
            {text: '指南', link: '/guide/installation'},
            {text: '组件', link: '/examples/form/basic'},
        ],
        socialLinks: [
            {icon: 'github', link: 'https://github.com/Dinert/dinert-element-ui'},
        ],
        sidebar: {
            '/guide/': [
                {
                    text: '基础',
                    items: [
                        {
                            text: '安装',
                            link: '/guide/installation'
                        },
                        {
                            text: '快速开始',
                            link: '/guide/quickstart'
                        },
                    ]
                },
            ],
            '/examples/': [
                {
                    text: '组件',
                    items: [
                        {
                            text: 'Form（表单）',
                            target: '/examples/form/basic',
                            collapsed: true,
                            base: '/examples/form/',
                            items: [
                                {
                                    text: '基础用法',
                                    link: 'basic',
                                },
                                {
                                    text: 'input 输入框',
                                    link: 'input',
                                },
                                {
                                    text: 'input-number 数字输入框',
                                    link: 'input-number',
                                },
                                {
                                    text: 'select 选择框',
                                    link: 'select',
                                },
                                // {
                                //     text: 'select-v2 虚拟化选择框',
                                //     link: 'select-v2',
                                // },
                                // {
                                //     text: 'tree-select 树形选择',
                                //     link: 'tree-select',
                                // },
                                // {
                                //     text: 'input-autocomplete 自动补全输入框',
                                //     link: 'autocomplete',
                                // },
                                {
                                    text: 'switch 开关',
                                    link: 'switch',
                                },
                                {
                                    text: 'date 时间选择器（时、日、周、月、年）',
                                    link: 'date',
                                },
                                {
                                    text: 'radio 单选按钮',
                                    link: 'radio',
                                },
                                {
                                    text: 'checkbox 多选框',
                                    link: 'checkbox',
                                },
                                {
                                    text: 'rate 评分',
                                    link: 'rate',
                                },
                                {
                                    text: 'cascader 级联选择器',
                                    link: 'cascader',
                                },
                                {
                                    text: 'slider 滑块',
                                    link: 'slider',
                                },
                                {
                                    text: 'time-picker 时间选择器',
                                    link: 'time-picker',
                                },
                                {
                                    text: 'time-select 时间选择',
                                    link: 'time-select',
                                },
                                {
                                    text: '属性',
                                    link: 'explain',
                                },

                            ]
                        },
                        {
                            text: 'Table（表格）',
                            target: '/examples/table/basic',
                            collapsed: true,
                            base: '/examples/table/',
                            items: [
                                {
                                    text: '基础用法',
                                    link: 'basic',
                                },
                                {
                                    text: '高级用法',
                                    link: 'advanced',
                                },
                                {
                                    text: '属性',
                                    link: 'explain',
                                }
                            ]
                        },
                        {
                            text: 'TablePage（表格查询）',
                            target: '/examples/table-page/basic',
                            collapsed: true,
                            base: '/examples/table-page/',
                            items: [
                                {
                                    text: '基础用法',
                                    link: 'basic',
                                },
                                {
                                    text: '高级用法',
                                    link: 'advanced',
                                },
                            ]
                        },
                        {
                            text: 'Dialog（弹窗）',
                            target: '/examples/dialog/basic',
                            collapsed: true,
                            base: '/examples/dialog/',
                            items: [
                                {
                                    text: '基础用法',
                                    link: 'basic',
                                },
                                {
                                    text: '属性',
                                    link: 'explain',
                                },
                            ]
                        },
                        {
                            text: 'Tooltip（动态超出宽度打点）',
                            target: '/examples/tooltip/basic',
                            collapsed: true,
                            base: '/examples/tooltip/',
                            items: [
                                {
                                    text: '基础用法',
                                    link: 'basic',
                                },
                                {
                                    text: '属性',
                                    link: 'explain',
                                },
                            ]
                        }
                    ]

                }
            ]
        }
    },
    markdown: {
        lineNumbers: true,
        config: md => mdPlugin(md)
    }
})
