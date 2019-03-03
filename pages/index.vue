<template>
  <div class="index-container">
    <div class="index-left"><webview :src="viewerSrc" class="viewer" /></div>
    <div class="index-right">
      <commit-board
        :commits="commits"
        :currentCommit="currentCommit"
        :filename="file(currentTab.id).name"
        :users="users"
        :selfIcon="icon"
        class="commit-board"
        @addComment="$store.commit('file/addComment', $event)"
        @addCommit="$store.commit('file/addCommit', $event)"
      />
      <members class="members" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import userIcon from '~/assets/imgs/user1.png'
import CommitBoard from '~/components/molecules/CommitBoard'
import Members from '~/components/molecules/Members'

export default {
  components: {
    CommitBoard,
    Members,
  },
  computed: {
    ...mapState('tab', ['currentTab']),
    ...mapState('file', ['currentCommit']),
    ...mapState('user', ['icon']),
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
    viewerSrc() {
      return `https://view.officeapps.live.com/op/embed.aspx?src=${this.currentCommit.url}`
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

$TOP_BAR_HEIGHT: 70px;
$VIEWER_WIDTH: 650px;
$COMMIT_MAKER_HEIGHT: 60px;

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

.top-bar {
  height: $TOP_BAR_HEIGHT;
}

.index-right {
  flex: 2;
  height: 100%;
  position: relative;

  .members {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .commit-board {
    position: absolute;
    top: 0;
    left: 0;
    right: $MEMBERS_WIDTH;
    bottom: 0;
  }
}

.viewer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: -20px;
}
</style>
