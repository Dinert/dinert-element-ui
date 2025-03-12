<template>
    <div class="basic">
        <dinert-form :form="form" class="near"/>
    </div>
</template>

<script>
export default {
    name: 'Basic',
    data() {
        return {
            form: {
                formItem: {
                    name: {
                        label: '名称',
                        type: 'input',
                    }
                },
                model: {

                }
            },
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
