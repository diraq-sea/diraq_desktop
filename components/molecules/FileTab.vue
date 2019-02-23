<template>
  <div class="ft-container">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      :class="itemClass(tab.id)"
      class="ft-tab"
      @click="$store.dispatch('tab/changeCurrentTab', tab.id)"
    >
      <span>{{ tab.name }}</span
      ><i class="fas fa-times" @click.stop="$store.commit('tab/removeTab', tab.id)" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('tab', ['tabs', 'currentTab']),
    itemClass() {
      return id => ({ current: this.currentTab.id === id })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

.ft-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow-x: auto;
  white-space: nowrap;
  background: $COLOR_GRAY2;

  .ft-tab {
    display: inline-block;
    height: $TAB_HEIGHT;
    background: $COLOR_GRAY;
    margin-right: 1px;
    color: rgb(109, 109, 109);
    font-size: 16px;
    cursor: pointer;
    vertical-align: middle;
    line-height: $TAB_HEIGHT;
    padding: 0 36px;
    text-align: center;
    position: relative;

    &.current {
      background: $COLOR_BLACK;
      color: $FONT_WHITE;

      i {
        opacity: 1;
      }
    }

    &:hover > i {
      opacity: 1;
    }

    i {
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
      font-size: 12px;
      opacity: 0;
      color: $FONT_WHITE;
    }
  }
}
</style>
