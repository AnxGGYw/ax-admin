export interface IThemeSettingItem {
  leftBg: string
  rightTopBg: string
  rightBottomBg: string
  checked: boolean
  isDark: boolean
  text: string
}

export default function useThemeSetting() {
  const message = useMessage()

  const themeList = reactive<IThemeSettingItem[]>([
    {
      leftBg: '#fff',
      rightTopBg: '#fff',
      rightBottomBg: '#f5f5f5',
      checked: !isDark.value,
      isDark: false,
      text: '明亮'
    },
    {
      leftBg: '#000',
      rightTopBg: '#000',
      rightBottomBg: '#333',
      checked: isDark.value,
      isDark: true,
      text: '暗黑'
    }
  ])

  const handleThemeSettingClick = (item: IThemeSettingItem) => {
    // 切换下面绿色的小圈圈
    themeList.forEach(it => (it.checked = it === item))
    changeTheme(item)
  }

  const handleThemeChange = (item: Pick<IThemeSettingItem, 'isDark'>) => {
    changeTheme(item)
  }

  const changeTheme = <T extends { isDark: boolean }>(item: T) => {
    if (item.isDark) {
      // 点击暗黑， 如果已经是暗黑系了，就不管
      if (isDark.value) {
        message.warning('已经是暗黑主题')
        return
      }
      toggleDark()
      message.success('切换暗黑主题')
    } else {
      // 点击明亮
      if (!isDark.value) {
        message.warning('已经是明亮主题')
        return
      }
      toggleDark()
      message.success('切换明亮主题')
    }
  }

  return {
    handleThemeSettingClick,
    handleThemeChange,
    themeList
  }
}
