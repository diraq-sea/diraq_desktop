<template>
  <div>
    <room-view v-for="tab in roomTabs" v-show="isTabVisible(tab)" :key="tab.id" :tab="tab" />
    <folder-view v-for="tab in folderTabs" v-show="isTabVisible(tab)" :key="tab.id" :tab="tab" />
    <file-view v-for="tab in fileTabs" v-show="isTabVisible(tab)" :key="tab.id" :tab="tab" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import RoomView from '~/components/organisms/RoomView'
import FolderView from '~/components/organisms/FolderView'
import FileView from '~/components/organisms/FileView'

export default {
  components: {
    RoomView,
    FolderView,
    FileView,
  },
  data() {
    return {
      hadOpenedTabIds: [this.$store.state.tab.currentTabId],
    }
  },
  computed: {
    ...mapState('tab', ['tabs', 'currentTabId']),
    ...mapGetters('tab', ['isRoomTab', 'isFolderTab', 'isFileTab']),
    filteredTabs() {
      return this.tabs.filter(tab => this.hadOpenedTabIds.indexOf(tab.id) > -1)
    },
    roomTabs() {
      return this.filteredTabs.filter(tab => this.isRoomTab(tab))
    },
    folderTabs() {
      return this.filteredTabs.filter(tab => this.isFolderTab(tab))
    },
    fileTabs() {
      return this.filteredTabs.filter(tab => this.isFileTab(tab))
    },
    isTabVisible() {
      return tab => tab.id === this.currentTabId
    },
  },
  watch: {
    currentTabId(id) {
      if (this.hadOpenedTabIds.indexOf(id) > -1) return
      this.hadOpenedTabIds = [...this.hadOpenedTabIds, id]
    },
  },
}
</script>
