import {defineComponent} from '@vue/composition-api'
import dayjs from 'dayjs'

import '@/assets/scss/dinert-time-player.scss'

import type {ResultType, ConfigType} from '@/components/time-player/types'

// 时间转换为宽度计算
const getWidth = (startTime, endTime, currentTempTime) => {

    const startEndDiffer
      = dayjs(endTime).valueOf() - dayjs(startTime).valueOf()
    let currentEndDiffer
      = dayjs(endTime).valueOf() - dayjs(currentTempTime).valueOf()
    currentEndDiffer = startEndDiffer - currentEndDiffer
    const percentDiffer = (currentEndDiffer / startEndDiffer) * 100
    return percentDiffer
}


const getConfig = (event, startTime, endTime) => {
    const el = event.currentTarget
    const x = event.layerX + 1
    const width = el.offsetWidth
    let percent = x / width
    const startEndDiffer
      = dayjs(endTime).valueOf() - dayjs(startTime).valueOf()
    const time = dayjs(startTime).valueOf() + dayjs(startEndDiffer * percent).valueOf()
    percent = percent * 100

    const result: ConfigType = {
        timestamp: dayjs(time).startOf('hours').valueOf(),
        time: dayjs(time).startOf('hours').format('YYYY-MM-DD HH:mm:ss'),
        percent,
        width: x,
    }
    return result
}

export default defineComponent({
    name: 'dinert-time-player',
    props: {
        modelValue: {
            type: Date,
            default: () => (new Date(dayjs().subtract(1, 'day').startOf('hour').valueOf()))
        },
        startTime: {
            // 开始时间
            type: Date,
            default: () => {
                return new Date(dayjs().subtract(2, 'day').startOf('day').valueOf())
            },
        },
        endTime: {
            // 结束时间
            type: Date,
            default: () => {
                return new Date(dayjs().add(2, 'day').startOf('day').valueOf())
            },
        },
        currentTime: {
            // 时间轴当前时间
            type: Date,
            default: () => {
                return new Date(dayjs().subtract(1, 'day').startOf('hour').valueOf())
            },
        },
        // 时间轴停止的时间
        stopTime: {
            type: Date,
            default: () => {
                return new Date(dayjs().add(2, 'day').startOf('day').valueOf())
            },
        },
        // 底部时间格式化
        formatFooter: {
            type: String,
            default: 'YYYY年MM月DD日',
        },
        // tooltip时间格式化
        formatTooltip: {
            type: String,
            default: 'YYYY年MM月DD日 HH时',
        },
        // 24小时时间的间隔
        interval: {
            type: Number,
            default: 3,
        },
        delay: {
            // 播放时间间隔
            type: Number,
            default: 2000,
        },
    },
    data() {
        return {
            barRef: null as HTMLElement | null,
            tooltipRef: null as HTMLElement | null,
            tempTooltipRef: null as HTMLElement | null,
            isTempTooltip: false,
            isPlay: false,
            config: {} as ConfigType,
            timeTimeout: null as any,
            currentTempTime: this.currentTime,
            hoverTime: this.currentTime,
            timeClickFlag: false,
        }
    },
    mounted() {
        this.barRef = this.$refs.barRef as any
        this.tooltipRef = this.$refs.tooltipRef as any
        this.tempTooltipRef = this.$refs.tempTooltipRef as any

        this.animateAfter()
        const width = getWidth(this.startTime, this.endTime, this.currentTempTime)
        this.autoMove(width, undefined)
    },
    computed: {
        items() {
            const result: ResultType[] = []
            const hours = 3600 * 1000
            const daysTimestamp = hours * 24
            let time = dayjs(this.startTime).valueOf()
            const items = dayjs(this.endTime).diff(dayjs(this.startTime), 'days')
            const width = 100 / items + '%'
            const left = 100 / (24 / this.interval)
            for (let i = 0; i < items; i++) {
                const tempArr: any = []
                let count = 0
                for (let j = 1; j < 24; j++) {
                    if (j % this.interval === 0) {
                        count++
                        tempArr.push({
                            text: j,
                            left: left * count + '%',
                            id: Math.random(),
                        })
                    }
                }
                result.push({
                    hours: tempArr,
                    time: dayjs(time).format(this.formatFooter),
                    width,
                })
                time += daysTimestamp
            }
            return result
        },
        formatTooltipText() {
            return dayjs(this.currentTempTime).format(this.formatTooltip)

        },
        formatTempTooltipText() {
            return dayjs(this.hoverTime).format(this.formatTooltip)

        }
    },
    methods: {
        autoMove(width, event) {
            // 自动播放
            !event && this.isPlay && (this.currentTempTime = dayjs(this.currentTempTime).add(1, 'hours').toDate())
            let percent = width || getWidth(this.startTime, this.endTime, this.currentTempTime)

            // 判断超出距离设置为100
            if (percent > 100) {
                percent = 100
            }

            this.barRef && (this.barRef.style.width = percent + '%')
            this.tooltipRef && (this.tooltipRef.style.left = percent + '%')

            if (!event) {

                this.config = {
                    percent,
                    time: dayjs(this.currentTempTime).startOf('hours').format('YYYY-MM-DD HH:mm:ss'),
                    width: this.barRef?.offsetWidth,
                    timestamp: dayjs(this.currentTempTime).startOf('hours').valueOf()
                }
            }


            // 判断结束时间是否大于当前时间，如果大于就停止播放
            if (dayjs(this.stopTime).startOf('hours').valueOf() <= dayjs(this.currentTempTime).valueOf()) {
                this.isPlay = false
            }
            if (this.isPlay) {


                this.timeTimeout && clearTimeout(this.timeTimeout)
                this.timeTimeout = (setTimeout(() => {
                    this.autoMove(undefined, undefined)
                }, this.delay) as any)
            } else {
                this.timeTimeout && clearTimeout(this.timeTimeout)
            }
        },
        timeClick(event) {
            this.timeClickFlag = true
            this.config = getConfig(event, this.startTime, this.endTime)

            // 判断结束时间是否大于当前时间，如果大于就停止播放
            if (dayjs(this.stopTime).startOf('hours').valueOf() <= dayjs(this.config.time).valueOf()) {
                return
            }

            this.currentTempTime = dayjs(this.config.time).toDate()

            this.autoMove(this.config.percent, event)
            this.$emit('animate-before', this.config)
        },
        animateAfter() {
            this.barRef && this.barRef.addEventListener('transitionend', () => {
                if (!this.timeClickFlag) {
                    this.$emit('animate-after', this.config)
                } else {
                    this.timeClickFlag = false
                }
            })
        },

        timeMouseEnter(event) {
            const config = getConfig(event, this.startTime, this.endTime)
            this.tempTooltipRef && (this.tempTooltipRef.style.left = config.percent + '%')
            this.hoverTime = dayjs(config.time).toDate()
            this.isTempTooltip = true
        },
        timeMouseLeave() {
            this.isTempTooltip = false
        },
        timePlay() {
            // 判断结束时间是否大于当前时间，如果大于就停止播放
            if (dayjs(this.stopTime).startOf('hours').valueOf() <= dayjs(this.currentTempTime).valueOf()) {
                return
            }

            this.isPlay = !this.isPlay
            if (this.isPlay) {
                this.timeTimeout && clearTimeout(this.timeTimeout)
                this.timeTimeout = setTimeout(this.autoMove, this.delay)
            } else {
                clearTimeout(this.timeTimeout)
            }
        },
        // 开始播放
        startPlay() {
            this.isPlay = true
            this.timeTimeout && clearTimeout(this.timeTimeout)
            this.timeTimeout = setTimeout(this.autoMove, this.delay)
        },
        stopPlay() {
            this.isPlay = false
            this.timeTimeout && clearTimeout(this.timeTimeout)
        },
        timeNowFn() {
            this.currentTempTime = dayjs(this.currentTime).toDate()
            this.autoMove(undefined, undefined)
        }

    },
    render() {
        return (
            <div class="dinert-time-player">
s                <div class="dinert-time-player-left">
                    <div class="dinert-time-player-left-top"></div>
                    <div class="dinert-time-player-left-bottom" onClick={this.timePlay}>
                        <span class={['dinert-time-player-left-bottom-start', this.isPlay ? 'stop' : '']} ></span>
                    </div>
                </div>
                <div class="dinert-time-player-center">
                    <div class="dinert-time-player-center-top">
                        <div class="dinert-time-player-center-top-bar" ref={'barRef'}></div>
                        <div class="dinert-time-player-center-top-tooltip" ref={'tooltipRef'}>
                            {this.formatTooltipText}
                        </div>
                        <div
                            class="dinert-time-player-center-top-tooltipTemp"
                            ref={ 'tempTooltipRef'}
                            v-show={this.isTempTooltip}
                        >
                            {this.formatTempTooltipText}
                        </div>
                        <ul class="dinert-time-player-center-top-ul"
                            onClick={this.timeClick}
                            onMousemove={event => this.timeMouseEnter(event)}
                            onMouseleave={this.timeMouseLeave}
                        >
                            {
                                this.items.map((item: any) => {
                                    return <li style={{width: item.width}} time={item.time} key={item.time}></li>
                                })
                            }
                        </ul>
                    </div>

                    <div class="dinert-time-player-center-center">
                        <ul class="dinert-time-player-center-center-ul">
                            {
                                this.items.map((item: any) => {
                                    return (
                                        <li class="dinert-time-player-center-center-ul-li" style={{width: item.width}} time={item.time} key={item.time}>
                                            {
                                                item.hours.map(item => {
                                                    return <span key={item.id} style={{left: item.left}}>{item.text}</span>
                                                })
                                            }
                                        </li>
                                    )
                                })

                            }
                        </ul>
                    </div>

                    <div class="dinert-time-player-center-bottom">
                        <ul class="dinert-time-player-center-bottom-ul">
                            {
                                this.items.map((item: any) => {
                                    return (
                                        <li class="dinert-time-player-center-bottom-ul-li" style={{width: item.width}} time={item.time} key={item.time}>
                                            {item.time}
                                        </li>
                                    )
                                })

                            }
                        </ul>
                    </div>
                </div>
                <div class="dinert-time-player-right">
                    <span class="dinert-time-player-right-now" onClick={this.timeNowFn}>回到当前</span>
                </div>
            </div>
        )
    }
})
