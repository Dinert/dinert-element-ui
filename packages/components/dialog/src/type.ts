
import type {Dialog} from 'element-ui'

export interface RewriteDialogProps extends Partial<InstanceType<typeof Dialog>> {
    size?: string
    height?: number | string
    showFull?: boolean
    customDrag?: boolean
    explain?: string
    boxShadow?: boolean
    fullscreen?: boolean
    style?: object
}

export interface GETWH {
    width?: RewriteDialogProps['width'] | number
    height?: RewriteDialogProps['height'] | number
}
