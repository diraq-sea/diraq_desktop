<template>
  <div class="fp-container">
    <loading-panel v-if="loading" />
    <template v-else>
      <div class="fp-left">
        <div v-if="isPdf" class="pdf-viewer">
          <pdf
            v-for="i in numPages"
            :key="i"
            :src="url"
            :page="i"
            @num-pages="setNumPages"
            class="pdf"
          />
        </div>
        <webview v-else :src="viewerSrc" :style="viewerStyle" class="viewer" />
      </div>
      <div class="fp-right">
        <commit-board
          :file="file(fileId)"
          :currentCommit="currentCommit(fileId)"
          :users="members(roomId)"
          :selfIcon="icon"
          class="commit-board"
          @addComment="$store.commit('file/addComment', $event)"
          @addCommit="$store.commit('file/addCommit', $event)"
        />
        <members :roomId="roomId" class="members" />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Pdf from 'vue-pdf'
import CommitBoard from '~/components/molecules/CommitBoard'
import Members from '~/components/molecules/Members'
import LoadingPanel from '~/components/atoms/LoadingPanel'

export default {
  components: {
    LoadingPanel,
    CommitBoard,
    Members,
    Pdf,
  },
  props: {
    tab: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('user', ['icon']),
    ...mapGetters('member', ['members']),
    ...mapGetters('file', ['file', 'currentCommit']),
    ...mapGetters('tab', ['currentTab']),
    viewerSrc() {
      return `https://view.officeapps.live.com/op/embed.aspx?src=${this.url}`
    },
    fileId() {
      return this.tab.values.fileId
    },
    roomId() {
      return this.file(this.fileId).roomId
    },
    extname() {
      return this.file(this.fileId).extname
    },
    url() {
      return this.currentCommit(this.fileId).url
    },
    viewerStyle() {
      return {
        bottom: `-${
          {
            docx: 22,
            xlsx: 27,
            pptx: 24,
          }[this.extname]
        }px`,
        right: `${this.extname === 'pptx' ? -1 : 0}px`,
      }
    },
    isPdf() {
      return this.extname === 'pdf'
    },
  },
  data: () => ({ loading: true, numPages: 1 }),
  async created() {
    await this.$store.dispatch('file/fetchFile', this.currentTab.values.fileId)

    await Promise.all([
      this.$store.dispatch('room/fetchRoomInfo', this.roomId),
      this.$store.dispatch('member/fetchMembers', this.roomId),
    ])

    this.loading = false
  },
  methods: {
    setNumPages(e) {
      this.numPages = e || this.numPages
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
}

.pdf-viewer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 30px;
  background: $COLOR_BORDER;
  overflow: auto;

  .pdf {
    margin: 50px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }
}
</style>
