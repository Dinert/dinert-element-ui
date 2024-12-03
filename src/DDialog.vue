<template>
    <div class="home">
        <el-button type="primary" @click="modelValue = true">打开弹窗</el-button>
        <el-button type="primary" @click="modelValue2 = true">全屏弹窗</el-button>
        <!-- <el-dialog :visible="modelValue">

            <template #footer>
                <el-button type="primary">保存</el-button>
                <el-button plain @click="modelValue = false">取消</el-button>
            </template>
        </el-dialog> -->
        <dinert-dialog v-model="modelValue"/>
        {{ modelValue }}
    </div>
</template>
<script>
export default {
    name: 'DDialog',
    data() {
        return {
            modelValue: false,
            modelValue2: false,
        }
    },
    computed: {

    },
    methods: {

    },

}
</script>

<style lang="scss" scoped>

</style>
