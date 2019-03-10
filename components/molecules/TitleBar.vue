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
import { CLOSE_WIN, MAX_WIN, UNMAX_WIN, MIN_WIN } from '~/common/ipcTypes'

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

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

.title-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $TITLEBAR_HEIGHT;
  background: $COLOR_TITLE_BAR;

  .draggable {
    position: absolute;
    top: 3px; // for resizable
    left: 3px;
    right: 3px;
    bottom: 0;
    -webkit-app-region: drag;
  }

  .win-controls {
    position: absolute;
    top: 0;
    width: $CONTROLS_WIDTH;
    height: 30px;
    right: 0;
    display: flex;
    -webkit-app-region: no-drag;

    .controls-icon {
      flex: 1;
      height: 100%;
      color: $COLOR_DATE;
      line-height: 30px;
      text-align: center;
      font-size: 12px;

      &:hover {
        background: $COLOR_BORDER;
        color: $FONT_SUB;
      }

      &.invert {
        transform: rotateZ(180deg);
      }

      &.red {
        font-size: 16px;

        &:hover {
          color: #fff;
          background: $COLOR_RED;
        }
      }
    }
  }
}
</style>
