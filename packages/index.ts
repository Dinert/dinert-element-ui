
import * as components from './components/index'
export * from './components/index'

const myPlugin: any = {
    install: (app: any) => {
        for (const name in components) {
            app.use(components[name])
        }
    }
}

export default myPlugin
