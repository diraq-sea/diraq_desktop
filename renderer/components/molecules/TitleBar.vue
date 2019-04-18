<template>
  <div class="title-bar">
    <div class="draggable" />
    <div v-if="isNotMac" class="win-controls">
      <div class="controls-icon" @click="$ipc(MIN_WIN)"><i class="fas fa-minus" /></div>
      <div v-if="isMaximized" class="controls-icon invert" @click="$ipc(UNMAX_WIN)">
        <i class="far fa-clone" />
      </div>
      <div v-else class="controls-icon" @click="$ipc(MAX_WIN)"><i class="far fa-square" /></div>
      <div class="controls-icon red" @click="$ipc(CLOSE_WIN)"><i class="fas fa-times" /></div>
    </div>
    <slot />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { CLOSE_WIN, MAX_WIN, UNMAX_WIN, MIN_WIN } from '~~/common/ipcTypes'

export default {
  computed: {
    ...mapState(['isMaximized']),
    CLOSE_WIN: () => CLOSE_WIN,
    MAX_WIN: () => MAX_WIN,
    UNMAX_WIN: () => UNMAX_WIN,
    MIN_WIN: () => MIN_WIN,
    isNotMac() {
      return this.$platform !== 'mac'
    },
  },
}
</script>

<style scoped>
.title-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--titlebar-height);
  background: var(--color-title-bar);
}
.title-bar .draggable {
  position: absolute;
  top: 3px; /* for resizable */
  left: 3px;
  right: 3px;
  bottom: 0;
  -webkit-app-region: drag;
}

.title-bar .win-controls {
  position: absolute;
  top: 0;
  width: var(--controls-width);
  height: 30px;
  right: 0;
  display: flex;
  -webkit-app-region: no-drag;
}
.title-bar .win-controls .controls-icon {
  flex: 1;
  height: 100%;
  color: var(--color-date);
  line-height: 30px;
  text-align: center;
  font-size: 12px;
}
.title-bar .win-controls .controls-icon:hover {
  background: var(--color-border);
  color: var(--font-sub);
}

.title-bar .win-controls .controls-icon.invert {
  transform: rotateZ(180deg);
}

.title-bar .win-controls .controls-icon.red {
  font-size: 16px;
}
.title-bar .win-controls .controls-icon.red:hover {
  color: #fff;
  background: var(--color-red);
}
</style>
