import _Form from './src'
import Plugin from '@vue/composition-api'

type SFCWithInstall<T> = T & typeof Plugin
const withInstall = <T>(comp: T) => {
    (comp as SFCWithInstall<T>).install = (app: any) => {
        const name = (comp as any).name
        // 注册组件
        app.component(name, comp as SFCWithInstall<T>)
    }
    return comp
}
export const DinertForm = withInstall(_Form)
export default DinertForm
