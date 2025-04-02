

<template>
    <span class="inline-flex items-center">
        <code class="api-typing mr-1">
            {{ type }}
        </code>
        <ClientOnly>
            <ElTooltip v-if="details" effect="light"
                trigger="click" popper-class="api-type"
            >
                <ElButton
                    type="text"
                    icon="el-icon-warning-outline"
                    :aria-label="details"
                    class="p-2 text-4"
                />
                <template #content>
                    <slot>
                        <div class="m-1" style="max-width: 600px;background-color: #f5f7fa;">
                            <code style="color: #409eff;">
                                {{ details }}
                            </code>
                        </div>
                    </slot>
                </template>
            </ElTooltip>
        </ClientOnly>
    </span>
</template>

<script>
export default {
    name: 'dinert-api-typing',
    props: {
        type: {
            type: String,
            required: true,
        },
        details: {
            type: String,
            default: '',
        },
    },
}

</script>

<style>
.api-typing {
    cursor: pointer;
}

.inline-flex {
    display: flex;
    align-items: center;
}

.el-button {
    margin-left: 4px;
    padding: 8px;
}

.api-type.el-tooltip__popper.is-light {
    border-color: #e4e7ed;
}
</style>
