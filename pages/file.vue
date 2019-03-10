<template>
  <div class="fp-container">
    <div class="fp-left"><webview :src="viewerSrc" class="viewer" /></div>
    <div class="fp-right">
      <commit-board
        :commits="file.commits"
        :currentCommit="currentCommit"
        :filename="file.name"
        :users="members"
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
import CommitBoard from '~/components/molecules/CommitBoard'
import Members from '~/components/molecules/Members'

export default {
  components: {
    CommitBoard,
    Members,
  },
  async fetch({ store }) {
    await store.dispatch('file/fetchFile', store.getters['tab/currentTab'].values.fileId)
    const { roomId } = store.state.file.file
    await Promise.all([
      store.dispatch('room/fetchRoomInfo', roomId),
      store.dispatch('member/fetchMembers', roomId),
    ])
  },
  computed: {
    ...mapState('file', ['file']),
    ...mapState('user', ['icon']),
    ...mapState('member', ['members']),
    ...mapGetters('file', ['currentCommit']),
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

.fp-container {
  display: flex;
  height: 100%;
}

.fp-left {
  min-width: $VIEWER_WIDTH;
  flex: 3;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.top-bar {
  height: $TOP_BAR_HEIGHT;
}

.fp-right {
  flex: 2;
  height: 100%;
  position: relative;
  border-left: 1px solid $COLOR_BORDER;

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
  top: -1px;
  left: -1px;
  right: 0;
  bottom: -22px;
}
</style>
