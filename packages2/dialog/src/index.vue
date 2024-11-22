<template>
    <el-dialog v-bind="dialog" v-on="{...dialog.on}">
        <template #title>
            <slot name="title"></slot>
        </template>
        <template #footer>
            <slot name="footer"></slot>
        </template>
    </el-dialog>
</template>

<script>
export default {
    name: 'DinertDialog',
    props: {
        dialog: {
            type: Object,
            default: () => ({})
        },
    },
}
</script>

<style lang="scss" scoped>
</style>
