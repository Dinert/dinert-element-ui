import {defineConfig} from 'vite'
import {createVuePlugin} from 'vite-plugin-vue2'
import path from 'path'
import dts from 'vite-plugin-dts'


export default defineConfig(({mode}) => {
    const config: any = {
        build: {
            // 打包文件目录
            outDir: 'es',
            // minify: false, // 是否压缩
            sourcemap: true, // 是否打包map文件
            rollupOptions: {
                // external: ['vue', 'dayjs', 'element-ui', 'lodash'],
                input: ['./packages/index.ts'],
                output: [
                    {
                        format: 'es',
                        // 打包后文件名
                        entryFileNames: '[name].js',

                        // 让打包目录和我们目录对应
                        preserveModules: true,
                        exports: 'named',
                        // 配置打包根目录
                        dir: 'es',

                    },
                    {
                        // 打包格式
                        format: 'cjs',
                        //   //打包后文件名
                        entryFileNames: '[name].js',
                        //   preserveModules: true,
                        exports: 'named',
                        //   //配置打包根目录
                        dir: 'lib',
                    },
                    {
                        format: 'umd',
                        exports: 'named',
                        dir: 'dist',
                        name: 'dinert-element-ui',
                        globals: {
                            'vue': 'Vue',
                            'dayjs': 'dayjs',
                            'element-ui': 'ElementUI',
                            'lodash': 'lodash'
                        },
                        // ✅ 在 UMD 输出里用插件注入变量
                        plugins: [
                            {
                                name: 'inject-umd-flag',
                                renderChunk(code) {
                                    // 注入一个全局变量 __UMD_BUILD__ = true
                                    return `window.__UMD_BUILD__ = true;\n${code}`
                                }
                            }
                        ]
                    }
                ]
            },
            lib: {
                entry: './index.ts',
            }
        },
        define: {
            'process.env.NODE_ENV': '"production"',
            '__UMD_BUILD__': 'false', // 默认 false // 直接替换 process.env.NODE_ENV
        },
        plugins: [
            createVuePlugin({
                vueTemplateOptions: {},
                jsx: true,
                jsxOptions: {
                    compositionAPI: false,
                }
            }),

            dts({
                entryRoot: './packages',

                outDir: ['./es/src', './lib/src'],

                // 指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
                tsconfigPath: './tsconfig.json',
            })
        ],

        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@packages': path.resolve(__dirname, './packages'),
                '@vuepress': path.resolve(__dirname, './vuepress'),
            },
            extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
        },
        server: {
            port: 8957,
        },

    }
    if (mode === 'test') {
        config.build = {}
        config.base = './'
    }
    return config
})
