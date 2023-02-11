import setting from '~/setting'
import type { IDrawer, IMenuSetting, IWaterMarkSetting } from '~/types/common'
import { STORAGE_WATER_MASK_KEY, STORAGE_MENU_KEY, STORAGE_THEME_COLOR_KEY } from '~/config/storage'
import { GlobalThemeOverrides } from 'naive-ui'
import { generateDarkerColor, generateLighterColor } from '~/utils/color'

const useSetting = defineStore('setting', () => {
  // 优先取localStorage
  const storageWaterMaskValue = localStorage.getItem(STORAGE_WATER_MASK_KEY)
  const storageMenuValue = localStorage.getItem(STORAGE_MENU_KEY)
  const storageThemeColorValue = localStorage.getItem(STORAGE_THEME_COLOR_KEY)
  // 水印
  const waterMarkSetting = storageWaterMaskValue
    ? reactive(JSON.parse(storageWaterMaskValue) as IWaterMarkSetting)
    : reactive({ ...setting.waterMarkSetting })
  // 菜单
  const menuSetting = storageMenuValue
    ? reactive(JSON.parse(storageMenuValue) as IMenuSetting)
    : reactive({ ...setting.menu })
  // 抽屉
  const drawerSetting = reactive<IDrawer>({ ...setting.drawer })
  // 主题色
  const themeColorSetting = storageThemeColorValue
    ? ref<string>(storageThemeColorValue)
    : ref<string>(setting.themeColor)

  watch(waterMarkSetting, (newSetting) => {
    localStorage.setItem(STORAGE_WATER_MASK_KEY, JSON.stringify(newSetting))
  })

  /**
   * 这里因为监听了menuSetting的变化
   * 所以用户修改菜单宽度以及点击折叠icon都会触发回调
   * 1. 用户定义菜单宽度的时候，小于一定程度自动折叠
   * 2. 又不能影响折叠icon点击的时候不生效
   * 所以这里加一个开关
   */
  watch(menuSetting, (newSetting) => {
    // 自动折叠
    if (!isClickCollapsedIcon) {
      menuSetting.collapsed = newSetting.collapsed = (newSetting.menuWidth <= menuSetting.autoCollapsedWidth)
    }
    localStorage.setItem(STORAGE_MENU_KEY, JSON.stringify(newSetting))
    // 关闭开关
    isClickCollapsedIcon = false
  })

  let isClickCollapsedIcon = $ref(false)
  const setCollapsed = (isCollapsed: boolean): void => {
    isClickCollapsedIcon = true
    // 下面这段代码会触发上面watch，所以先吧开关打开
    menuSetting.collapsed = isCollapsed
  }

  watch(themeColorSetting, (newSetting: string) => {
    localStorage.setItem(STORAGE_THEME_COLOR_KEY, newSetting)
  })

  // 修改主题颜色 themeColorSetting 是响应式的
  const themeOverrides = computed<GlobalThemeOverrides>(() => {
    return {
      common: {
        primaryColor: themeColorSetting.value,
        primaryColorHover: generateDarkerColor(themeColorSetting.value),
        primaryColorPressed: generateLighterColor(themeColorSetting.value)
      }
    }
  })

  return {
    setCollapsed,
    waterMarkSetting,
    menuSetting,
    drawerSetting,
    themeColorSetting,
    themeOverrides
  }
})

export default useSetting

