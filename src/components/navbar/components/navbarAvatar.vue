<template>
  <n-el class="avatar-wrapper" flex cursor-pointer py-0 pl-10px pr-18px>
    <n-dropdown
      :show-arrow="true"
      trigger="hover"
      :options="options"
      size="large"
      @select="handleSelect"
    >
      <div center-layout-v>
        <img src="../../../assets/avatar.png" />
        <n-gradient-text ml-6px mr-4px>{{ nickName }}</n-gradient-text>
      </div>
    </n-dropdown>
  </n-el>
</template>

<script lang="ts">
defineComponent({
  name: 'NavBarAvatar'
})
</script>

<script setup lang="ts">
import useAvatar from '../useAvatar'
const { nickName, options, handleSelect } = useAvatar()
</script>

<style lang="less" scoped>
.avatar-wrapper {
  img {
    width: 28px;
    border-radius: 50%;
  }
  &:hover {
    cursor: pointer;
    color: var(--primary-color);
  }
}
</style>
