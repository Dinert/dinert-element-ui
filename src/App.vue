<template>
    <div class="app">
        <!-- <h1>Vue2时间轴播放器</h1>
        <div>
            <dinert-time-player ref="timePlayerRef" :current-time="currentTime"
                @animate-before="animateBefore"
                @animate-after="animateAfter"
            />
            <div class="button">
                <button type="button" @click="$refs.timePlayerRef.startPlay()">开始播放</button>
                <button type="button" @click="$refs.timePlayerRef.stopPlay()">停止播放</button>
            </div>
        </div>
        <div>
            <dinert-time-player ref="timePlayerRef2" :current-time="currentTime"
                class="light"
                @animate-before="animateBefore"
                @animate-after="animateAfter"
            />
            <div class="button">
                <button type="button" @click="$refs.timePlayerRef2.startPlay()">开始播放</button>
                <button type="button" @click="$refs.timePlayerRef2.stopPlay()">停止播放</button>
            </div>
        </div> -->
        <!-- <dinert-form :form="form"/> -->
        <table-page/>
        <!-- <el-form>
            <el-input/>
        </el-form> -->
    </div>
</template>

<script>
import DTable from './DTable.vue'
import TablePage from './TablePage.vue'
export default {
    name: 'Home',
    components: {
        DTable,
        TablePage
    },
    data() {
        return {
            currentTime: new Date(),
            form: {
                model: {},
                formItem: {
                    name: {
                        type: 'input',
                        label: '姓名',
                        options: {}
                    }
                }
            }
        }
    },
    methods: {
        animateBefore(config) {
            console.log(config, 'animateBefore')
        },
        animateAfter(config) {
            console.log(config, 'animateAfter')
        }
    }
}
</script>

<style lang="scss" scoped>

.app {
    overflow: hidden;
    height: 100%;
    background-color: #f5f5f5;

    h1 {
        text-align: center;
    }

    // & > div {
    //     margin-top: 120px;
    // }
}

.button {
    margin: 20px auto;
    text-align: center;

    button {
        margin-left: 20px;
    }
}
</style>

<style lang="scss">
    html,
    body {
        margin: 0;
        padding: 0;
        height: 100%;
    }
</style>
