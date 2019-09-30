<template>
  <div :class="containerClass" class="ft-container">
    <user :name="name" :icon="icon" @logout="logout" />

    <div class="tab-container">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        :class="itemClass(tab.id)"
        class="ft-tab"
        @mousedown="changeCurrentTab(tab)"
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
            @mousedown.stop="$store.dispatch('tab/removeTab', tab.id)"
          />
        </div>
        <div class="tab-dragarea" />
      </div>

      <div class="tab-plus">
        <i class="fas fa-plus" title="Open new tab" @mousedown="$store.dispatch('tab/addNewTab')" />
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
    ...mapGetters('file', ['file']),
    containerClass() {
      return { isMac: this.$platform === 'mac' }
    },
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

    async changeCurrentTab(tab) {
      if (this.currentTabId === tab.id) return

      await this.$store.dispatch('tab/changeCurrentTab', tab.id)
      if (this.isFileTab(tab)) {
        const roomId = tab.values.roomId
        const fileId = tab.values.fileId
        await this.$store.dispatch('file/fetchFile', { roomId, fileId })
        for (const commit of this.file(fileId).commits) {
          for (const comment of commit.comments) {
            await this.$store.dispatch('file/watchComment', {
              roomId,
              fileId,
              commitId: commit.id,
              commentId: comment.id,
              userId: this.$store.state.user.id,
            })
          }
        }
      }
    },
  },
}
</script>

<style scoped>
.ft-container {
  position: relative;
  margin-top: calc(var(--titlebar-height) - var(--tab-height));
  margin-right: var(--controls-width);
  height: var(--tab-height);
  display: flex;
}

.ft-container.isMac {
  margin-right: 5px;
  margin-left: 64px;
}

.tab-container {
  flex: 1;
  display: flex;
}

.ft-tab {
  flex: 0 1 300px;
}

.tab-container .ft-tab {
  display: inline-block;
  height: 100%;
  border-right: 1px solid var(--color-border);
  color: var(--font-sub);
  font-size: 14px;
  vertical-align: middle;
  line-height: var(--tab-height);
  text-align: center;
  position: relative;
  transition: 0.2s background;
}

.tab-container .ft-tab .tab-dragarea {
  -webkit-app-region: drag;
  position: absolute;
  top: 0;
  left: 0;
  right: -1px;
  height: 6px;
  background: var(--color-title-bar);
}

.tab-container .ft-tab .tab-content {
  -webkit-app-region: no-drag;
  height: 100%;
  padding-right: 36px;
  border-radius: 8px 8px 0 0;
  transition: 0.2s background;
}

.tab-container .ft-tab .tab-content .file-icon {
  height: 18px;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
}

.tab-container .ft-tab .tab-content .file-name {
  padding-left: 36px;
}

.tab-container .ft-tab .tab-content .newtab-name {
  padding-left: 15px;
}

.tab-container .ft-tab .tab-content:hover {
  background: var(--color-title-hover);
}

.tab-container .ft-tab.current .tab-dragarea {
  display: none;
}

.tab-container .ft-tab .tab-content:hover + .tab-dragarea {
  opacity: 0;
}

.tab-container .ft-tab i {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  font-size: 12px;
  line-height: 18px;
  height: 18px;
  width: 18px;
  opacity: 0;
  color: var(--font-sub);
  display: block;
  border-radius: 50%;
  transition: 0.2s opacity;
}

.tab-container .tab-plus i {
  -webkit-app-region: no-drag;
  display: inline-block;
  height: 24px;
  width: 24px;
  line-height: 24px;
  border-radius: 50%;
}

.tab-container .ft-tab.current i {
  opacity: 1;
}

.tab-container .ft-tab i:hover {
  background: var(--color-border);
}

.tab-container .tab-plus i:hover {
  background: var(--color-border);
}

.tab-container .ft-tab .tab-content:hover i {
  opacity: 1;
}

.tab-container .ft-tab:hover {
  border-right-color: transparent;
}

.tab-container .ft-tab.current {
  color: var(--font-base);
  border-right-color: transparent;
}

.tab-container .ft-tab.current .tab-content {
  background: var(--color-page);
}

.tab-container .tab-plus {
  display: inline-block;
  color: var(--font-sub);
  font-size: 14px;
  text-align: center;
  width: 30px;
}
</style>
