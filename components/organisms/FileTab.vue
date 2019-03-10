<template>
  <div class="ft-container">
    <user :name="name" :icon="icon" @logout="logout" />

    <div class="tab-container">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        :class="itemClass(tab.id)"
        class="ft-tab"
        @mousedown="changeCurrentTab(tab.id)"
      >
        <div class="tab-content">
          <template v-if="isFileTab(tab)">
            <img class="file-icon" :src="$fileIcon(tab.values.extname)" />
            <div class="file-name">{{ tab.values.name }}</div>
          </template>
          <div v-else class="newtab-name">New Tab</div>

          <i
            v-if="isCloseBtnVisible(tab)"
            class="fas fa-times"
            title="Close tab"
            @mousedown.stop="removeTab(tab.id)"
          />
        </div>
        <div class="tab-dragarea" />
      </div>

      <div class="tab-plus">
        <i class="fas fa-plus" title="Open new tab" @mousedown="addNewTab" />
      </div>
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
    ...mapState('tab', ['tabs', 'currentTabId']),
    ...mapState('user', ['name', 'icon']),
    ...mapGetters('tab', ['isFileTab']),
    itemClass() {
      return id => ({ current: this.currentTabId === id })
    },
    isCloseBtnVisible() {
      return tab => this.tabs.length > 1 || this.isFileTab(tab)
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('login/logout')
      this.$router.push('/login')
    },

    async changeCurrentTab(id) {
      await this.$store.dispatch('tab/changeCurrentTab', id)
      this.$router.push('/')
    },

    async addNewTab() {
      await this.$store.dispatch('tab/addNewTab')
      this.$router.push('/')
    },

    async removeTab(id) {
      await this.$store.dispatch('tab/removeTab', id)
      this.$router.push('/')
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
      right: -1px;
      height: 6px;
      background: $COLOR_TITLE_BAR;
    }

    .tab-content {
      -webkit-app-region: no-drag;
      height: 100%;
      padding-right: 36px;
      border-radius: 8px 8px 0 0;
      transition: 0.2s background;

      .file-icon {
        height: 18px;
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
      }

      .file-name {
        padding-left: 36px;
      }

      .newtab-name {
        padding-left: 15px;
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

    &:hover {
      border-right-color: transparent;
    }

    &.current {
      color: $FONT_BASE;
      border-right-color: transparent;

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
      transition: 0.2s opacity;

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
