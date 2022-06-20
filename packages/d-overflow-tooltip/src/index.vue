<template>
  <el-tooltip :content="content" placement="top" :disabled="disabled">
    <span>
      <span class="text-tooltip">{{ content }}</span>
      <span class="label-text" @mouseenter="labelMouseEnter($event)"> {{ content }} </span>
    </span>
  </el-tooltip> 
</template>

<script>
export default {
  name: "DOverflowTooltip",
  props: {
    content: {
      type: String,
    }
  },
  data() {
    return {
      disabled: true
    };
  },
  computed: {},
  methods: {
    
    // 超出宽度显示tooltip
    labelMouseEnter(e) {
      const el = e.target.parentElement.parentElement
      const labelEl = window.getComputedStyle(el,null)
      const labelWidth =  parseInt(labelEl.getPropertyValue('max-width')) - parseInt(labelEl.getPropertyValue('padding-right'))
      const tooltipWidth = e.target.previousElementSibling.offsetWidth
      console.log(labelWidth, tooltipWidth, 'tooltipWidth')
      if(tooltipWidth > labelWidth) {
        this.disabled = false
      }else {
        this.disabled = true
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.text-tooltip{
  position: absolute;
  left: -999999999999px;
}
</style>