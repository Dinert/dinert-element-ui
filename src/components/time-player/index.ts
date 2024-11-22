import _TimePlay from './src'

import type {App} from '@vue/composition-api'
const withInstall = (comp: any) => {
    comp.install = (app: App) => {
        const name = comp.name
        // 注册组件
        app.component(name, comp)
    }
    return comp
}
export const DinertTimePlayer = withInstall(_TimePlay)
export default DinertTimePlayer
