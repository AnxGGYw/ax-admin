<template>
  <n-icon
    :size="size"
    :component="icon"
    class="navbar-music-icon-wrapper"
    @click="handleSongPlay"
  />
</template>

<script lang="ts">
defineComponent({
  name: 'NavBarMusicIcon'
})
</script>

<script setup lang="ts">
import { PlayCircleOutline, PauseCircleOutline } from '@vicons/ionicons5'
import useSong from '~/store/song'

defineProps({
  size: Number
})

const song = useSong()

const handleSongPlay = () => {
  song.togglePlay(!song.playing)
}

const icon = $computed(() => (song.playing ? PauseCircleOutline : PlayCircleOutline))
</script>

<style lang="less" scoped>
.navbar-music-icon-wrapper {
  min-width: 40px;
  cursor: pointer;

  &:hover {
    color: var(--primary-color);
  }
}
</style>
