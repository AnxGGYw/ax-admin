<template>
  <n-grid>
    <n-gi
      v-for="(item, index) of layoutList"
      :key="index"
      :span="12"
      @click="handleLayoutClick(item)"
    >
      <theme-setting
        :checked="item.checked"
        :left-bg="item.leftBg"
        :right-top-bg="item.rightTopBg"
        :right-bottom-bg="item.rightBottomBg"
        :text="item.text"
        :class="item.class"
      />
    </n-gi>
  </n-grid>
</template>

<script lang="ts">
defineComponent({
  name: 'LayoutSetting'
})
</script>

<script lang="ts" setup>
import useSetting from '~/store/setting'
import { useThemeVars } from 'naive-ui'
import { LayoutTypeEnum } from '~/types/common'
import { IThemeSettingItem } from '../theme-setting/useThemeSetting'

type layoutSettingType = Omit<IThemeSettingItem, 'isDark'> & {
  type: LayoutTypeEnum
  class?: string
}

const setting = useSetting()
let { layoutLR, layoutSetting } = $(setting)

const { pressedColor } = unref(useThemeVars())
const layoutList = reactive<layoutSettingType[]>([
  {
    leftBg: '#000',
    rightTopBg: pressedColor,
    rightBottomBg: pressedColor,
    checked: layoutLR,
    type: LayoutTypeEnum.LR,
    text: '左右'
  },
  {
    leftBg: pressedColor,
    rightTopBg: '#000',
    rightBottomBg: pressedColor,
    checked: !layoutLR,
    type: LayoutTypeEnum.TB,
    class: 'hidden-left',
    text: '上下'
  }
])

const handleLayoutClick = (item: layoutSettingType) => {
  const { type } = item
  if (layoutSetting !== type) {
    layoutSetting = type
    triggerMutationObserver()
  }
}

// 修改当前页面所有的echarts的style.width，
// 触发mutationObserver，调用 handleChartResize 函数，重新resize
// 再异步将width清除掉，否则第二次获取的宽度值不对
const triggerMutationObserver = () => {
  nextTick(() => {
    const echarts = document.querySelectorAll('.vue-echarts')
    echarts.forEach((chart: Element) => {
      ;(chart as HTMLElement).style.width = getComputedStyle(chart).width

      Promise.resolve().then(() => ((chart as HTMLElement).style.width = ''))
    })
  })
}
</script>

<style lang="less" scoped></style>
