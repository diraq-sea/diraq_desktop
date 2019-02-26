<template>
  <div class="index-container">
    <div class="index-left">
      <webview
        src="https://view.officeapps.live.com/op/embed.aspx?src=http%3A%2F%2Fwww%2Emech%2Etohoku%2Dgakuin%2Eac%2Ejp%3A80%2Frde%2Fcontents%2Fkougakukai%2Ffiles%2Ftemplate%2Edocx&amp;wdStartOn=1"
        class="viewer"
      />
    </div>
    <div class="index-right">
      <file-top-bar :filename="filename" class="top-bar" @changeFilename="changeFilename" />
      <commit-board :commits="commits" :users="users" class="commit-board" />
    </div>
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

$TOP_BAR_HEIGHT: 70px;
$VIEWER_WIDTH: 650px;

.index-container {
  color: $FONT_WHITE;
  display: flex;
  height: 100%;
}

.index-left {
  min-width: $VIEWER_WIDTH;
  flex: 3;
  height: 100%;
  position: relative;
}

.index-right {
  flex: 2;
  height: 100%;
  position: relative;
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

.viewer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: -20px;
}
</style>
