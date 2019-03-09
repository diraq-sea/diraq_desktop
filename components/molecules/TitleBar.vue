<template>
  <div class="title-bar">
    <div :class="draggableClass" class="draggable" />
    <div v-if="isNotMac" class="win-controls">
      <div class="controls-icon" @click="$ipc(MIN_WIN)"><i class="fas fa-minus" /></div>
      <div v-if="isMaximized" class="controls-icon invert" @click="$ipc(UNMAX_WIN)">
        <i class="far fa-clone" />
      </div>
      <div v-else class="controls-icon" @click="$ipc(MAX_WIN)"><i class="far fa-square" /></div>
      <div class="controls-icon red" @click="$ipc(CLOSE_WIN)"><i class="fas fa-times" /></div>
    </div>
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
    draggableClass() {
      return {
        isNotMac: this.isNotMac,
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

$CONTROLS_WIDTH: 150px;

.title-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $TITLEBAR_HEIGHT;
  background: $COLOR_DARK;

  .draggable {
    position: absolute;
    top: 3px; // for resizable
    left: 3px;
    right: 3px;
    bottom: 0;
    -webkit-app-region: drag;

    &.isNotMac {
      right: $CONTROLS_WIDTH;
    }
  }

  .win-controls {
    position: absolute;
    top: 0;
    width: $CONTROLS_WIDTH;
    right: 0;
    bottom: 0;
    display: flex;

    .controls-icon {
      flex: 1;
      height: 100%;
      color: $FONT_SUB;
      line-height: $TITLEBAR_HEIGHT;
      text-align: center;

      &:hover {
        color: $COLOR_SUB;
        background: #ffffff22;
      }

      &.invert {
        transform: rotateZ(180deg);
      }

      &.red {
        font-size: 18px;

        &:hover {
          background: $COLOR_RED;
        }
      }
    }
  }
}
</style>
