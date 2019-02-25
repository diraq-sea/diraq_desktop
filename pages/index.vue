<template>
  <div class="index-container">
    <file-top-bar :filename="filename" class="top-bar" @changeFilename="changeFilename" />
    <commit-board :commits="commits" :users="users" class="commit-board" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import userIcon from '~/assets/imgs/user1.png'
import FileTopBar from '~/components/molecules/FileTopBar'
import CommitBoard from '~/components/molecules/CommitBoard'

export default {
  components: {
    FileTopBar,
    CommitBoard,
  },
  computed: {
    ...mapState('tab', ['currentTab']),
    ...mapGetters('file', ['file']),
    commits() {
      return this.file(this.currentTab.id).commits
    },
    users() {
      return [
        { id: 1, name: 'master1', icon: userIcon },
        { id: 2, name: 'master2', icon: userIcon },
      ]
    },
  },
  data() {
    return {
      filename: this.$store.getters['file/file'](this.$store.state.tab.currentTab.id).name,
    }
  },
  watch: {
    currentTab() {
      this.filename = this.file(this.currentTab.id).name
    },
  },
  methods: {
    changeFilename(filename) {
      this.filename = filename
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

$TOP_BAR_HEIGHT: 80px;

.index-container {
  color: $FONT_WHITE;
}

.top-bar {
  height: $TOP_BAR_HEIGHT;
}

.commit-board {
  position: absolute;
  top: $TOP_BAR_HEIGHT;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}
</style>
