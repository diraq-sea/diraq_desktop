<template>
  <div class="ft-container">
    <user :name="name" :icon="icon" @logout="$emit('logout')" />

    <div class="tab-container">
      <div
        v-for="tab in filteredTab"
        :key="tab.id"
        :class="itemClass(tab.id)"
        class="ft-tab"
        @mousedown="$store.dispatch('tab/changeCurrentTab', tab.id)"
      >
        <div class="tab-content">
          <img class="file-icon" :src="$fileIcon(file(tab.id).extname)" />
          <span>{{ file(tab.id).name }}</span>
          <i
            class="fas fa-times"
            title="Close tab"
            @mousedown.stop="$store.commit('tab/removeTab', tab.id)"
          />
        </div>
        <div class="tab-dragarea" />
      </div>

      <div class="tab-plus"><i class="fas fa-plus" title="Open new tab" /></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import User from '~/components/atoms/User'

export default {
  components: {
    User,
  },
  computed: {
    ...mapState('tab', ['tabs', 'currentTab']),
    ...mapState('user', ['name', 'icon']),
    ...mapGetters('file', ['file']),
    itemClass() {
      return id => ({ current: this.currentTab.id === id })
    },
    filteredTab() {
      return this.tabs.filter(({ id }) => this.file(id))
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

.ft-container {
  position: relative;
  margin-top: calc(#{$TITLEBAR_HEIGHT} - #{$TAB_HEIGHT});
  margin-right: $CONTROLS_WIDTH;
  height: $TAB_HEIGHT;
  display: flex;
}

.tab-container {
  flex: 1;
  overflow-x: auto;
  white-space: nowrap;

  .ft-tab {
    display: inline-block;
    height: 100%;
    border-right: 1px solid $COLOR_BORDER;
    color: $FONT_SUB;
    font-size: 14px;
    vertical-align: middle;
    line-height: $TAB_HEIGHT;
    text-align: center;
    position: relative;
    transition: 0.2s background;

    .tab-dragarea {
      -webkit-app-region: drag;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: $COLOR_TITLE_BAR;
    }

    .tab-content {
      -webkit-app-region: no-drag;
      height: 100%;
      padding: 0 36px;
      border-radius: 8px 8px 0 0;

      .file-icon {
        height: 18px;
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
      }

      &:hover {
        background: $COLOR_TITLE_HOVER;

        & + .tab-dragarea {
          opacity: 0;
        }

        i {
          opacity: 1;
        }
      }
    }

    &.current {
      color: $FONT_BASE;
      border-right: none;

      .tab-dragarea {
        display: none;
      }

      .tab-content {
        background: $COLOR_PAGE;
      }

      i {
        opacity: 1;
      }
    }

    i {
      position: absolute;
      top: 50%;
      right: 8px;
      transform: translateY(-50%);
      font-size: 12px;
      line-height: 18px;
      height: 18px;
      width: 18px;
      opacity: 0;
      color: $FONT_SUB;
      display: block;
      border-radius: 50%;

      &:hover {
        background: $COLOR_BORDER;
      }
    }
  }

  .tab-plus {
    display: inline-block;
    color: $FONT_SUB;
    font-size: 14px;
    text-align: center;
    width: 30px;

    i {
      -webkit-app-region: no-drag;
      display: inline-block;
      height: 24px;
      width: 24px;
      line-height: 24px;
      border-radius: 50%;

      &:hover {
        background: $COLOR_BORDER;
      }
    }
  }
}
</style>
