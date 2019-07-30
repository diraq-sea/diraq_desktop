<template>
  <div>
    <div :class="CommitContainerObject">
      <div v-for="commit in file.commits" :key="commit.id">
        <div class="commit-graph">
          <div
            class="commit-circle"
            :class="{ enhance: commit.id == viewingId }"
            :style="circleStyle(user(commit.user).icon)"
          />
          <div v-if="hasChild(commit.id)" class="commit-line" />
        </div>
        <div class="comments-panel">
          <div class="committer-info">
            <span class="committer-name">{{ user(commit.user).name }}</span>
            <span class="committer-date">{{ formattedDate(commit.date) }}</span>
            <div class="file-controls">
              <div class="file-controls-icon" title="View file" @click="viewFile(commit)">
                <i class="fas fa-eye" />
              </div>
              <div class="file-controls-icon" title="Edit file" @click="editFile(commit)">
                <i class="fas fa-edit" />
              </div>
              <a
                :download="downloadingName"
                :href="currentCommit.url"
                class="file-controls-icon"
                title="Download file"
              >
                <i class="fas fa-file-download" />
              </a>
            </div>
          </div>
          <div class="committer-message">{{ commit.message }}</div>
          <div
            v-show="!showcomments[commit.id]"
            style="cursor: pointer; color: gray"
            @click="toggle(commit.id)"
          >
            {{ commit.comments.length }} comments
          </div>
          <div
            v-show="showcomments[commit.id] && commit.comments.length > 1"
            style="cursor: pointer; color: gray"
            @click="toggle(commit.id)"
          >
            hide comments
          </div>

          <div
            v-for="comment in commit.comments"
            v-show="showcomments[commit.id]"
            :key="comment.id"
            class="comment"
          >
            <div class="comment-circle" :style="circleStyle(user(comment.user).icon)" />
            <div class="comment-body">
              <span class="comment-username">{{ user(comment.user).name }}</span>
              <span class="comment-date">{{ formattedDate(comment.date) }}</span>
              <div class="comment-message">{{ comment.comment }}</div>
            </div>
          </div>

          <div v-show="showcomments[commit.id]" class="comment">
            <div class="comment-circle" :style="circleStyle(selfIcon)" />
            <div class="comment-body">
              <form class="comment-input" @submit.prevent="submitComment(commit.id)">
                <input
                  :value="value(commit.id)"
                  type="text"
                  placeholder="Input comment..."
                  @input="inputComment(commit.id, $event)"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isModified">
      <div class="commit-maker">
        <div class="commit-maker-graph">
          <div class="commit-circle blink" :style="circleStyle(selfIcon)" />
        </div>
        <div class="comments-panel">
          <div class="committer-info">
            <div class="comment-maker-text">Editting based on "{{ currentCommit.message }}"</div>
            <div class="file-controls">
              <div class="file-controls-icon" title="Edit file" @click="editFile(currentCommit)">
                <i class="fas fa-edit" />
              </div>
              <a
                :download="downloadingName"
                :href="currentCommit.url"
                class="file-controls-icon"
                title="Trash editting file"
              >
                <i class="far fa-trash-alt" />
              </a>
            </div>
          </div>

          <form class="comment-input" @submit.prevent="submitCommit">
            <input
              v-model="commitComment"
              type="text"
              placeholder="Input comment for uploading..."
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { DATE_FORMAT_TYPE } from '~/utils/const'
import { TMP_FILES_DIR } from '../../../main/const'

export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
    currentCommit: {
      type: Object,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
    selfIcon: {
      type: String,
      required: true,
    },
  },
  data() {
    const showcomments = this.file.commits.reduce(
      (obj, commit) => Object.assign(obj, { [commit.id]: false }),
      {},
    )
    for (const key in showcomments) {
      if (this.file.commits.find(commit => commit.id === key).comments.length === 1) {
        showcomments[key] = true
      }
    }
    const viewingId = this.currentCommit.id
    showcomments[viewingId] = true
    return {
      values: [],
      commitComment: '',
      // ismodal: false,
      // modalMessage: '',
      viewingId,
      showcomments,
      board_modified: false,
      board_default: true,
    }
  },
  computed: {
    CommitContainerObject() {
      return {
        'commit-container': !this.isModified,
        'commit-container-modified-true': this.isModified,
      }
    },
    isModified() {
      for (const commit in this.file.commits) {
        for (const id in this.committed) {
          if (this.committed[id].name.indexOf(this.file.commits[commit].id) === 0) {
            return true // commit後tmp.json削除
          }
        }
      }
      return false
    },
    ...mapState(['committed']),
    user() {
      return id => this.users.find(user => user.id === id)
    },
    hasChild() {
      return id =>
        this.file.commits.findIndex(commit => commit.id === id) < this.file.commits.length - 1
    },
    circleStyle() {
      return icon => ({ backgroundImage: `url(${icon})` })
    },
    value() {
      return id => this.values[this.file.commits.findIndex(commit => commit.id === id)]
    },
    downloadingName() {
      return `${this.file.name}_${this.currentCommit.id}.${this.file.extname}`
    },
    formattedDate() {
      return date => this.$moment(date).format(DATE_FORMAT_TYPE)
    },
  },
  mounted() {
    const commits = this.file.commits
    const commitId = commits[commits.length - 1].id
    this.scrolltoaCommit(commitId)
  },
  methods: {
    scrolltoaCommit(commitId) {
      let container = this.$el.querySelector('.commit-container')
      if (container === null) {
        container = this.$el.querySelector('.commit-container-modified-true')
      }
      const index = this.file.commits.findIndex(commit => commit.id === commitId)
      this.$el.querySelectorAll('.commit-graph')[index].scrollIntoView()
      container.scrollBy(0, -25)
    },
    inputComment(commitId, e) {
      this.values = [...this.values]
      const index = this.file.commits.findIndex(commit => commit.id === commitId)
      this.values[index] = e.target.value
    },
    toggle(id) {
      this.showcomments[id] = !this.showcomments[id]
    },
    async submitComment(commitId) {
      const index = this.file.commits.findIndex(commit => commit.id === commitId)
      const comment = this.values[index]
      const roomId = this.file.roomId
      const fileId = this.file.id

      if (comment) {
        await this.$store.dispatch('file/addComment', { roomId, fileId, commitId, comment })
        await this.$store.dispatch('file/fetchFile', { roomId, fileId })
        this.values = [...this.values]
        this.values[index] = ''
      }
    },
    async submitCommit() {
      const roomId = this.file.roomId
      const fileId = this.file.id
      const message = this.commitComment
      const extname = this.file.extname
      if (message) {
        const commitId = await this.$store.dispatch('file/saveCommitFile', {
          roomId,
          fileId,
          extname,
        })
        await this.$store.dispatch('file/addCommit', { roomId, fileId, id: commitId, message })
        await this.$store.dispatch('deleteTmpInfo', { fileId, extname })
        await this.$store.dispatch('file/fetchFile', { roomId, fileId })
        this.commitComment = ''
        this.showcomments[this.currentCommit.id] = true
        this.change_viewingCommit(this.currentCommit.id)
      }
    },
    async editFile(commit) {
      this.viewFile(commit)
      if (this.isModified) {
        this.Warning('You should upload your changes before editing other files.')
        return
      }
      const fileId = commit.fileId
      const isOpened = await this.$store.dispatch('file/checkOpenedFile', { TMP_FILES_DIR, fileId })
      if (isOpened) {
        this.Warning('You should close opened files.')
        return
      }
      const commitId = commit.id
      const extname = this.file.extname
      const commitpanel = this.isModified
      const result = await this.$store.dispatch('file/saveCommitId', {
        commitpanel,
        fileId,
        commitId,
      })
      await this.$store.dispatch('file/editFile', {
        extname,
        commit,
        result,
      })
    },
    change_viewingCommit(commitId) {
      this.viewingId = commitId
      for (const key in this.showcomments) {
        if (key === commitId) {
          this.showcomments[key] = true
        } else {
          this.showcomments[key] = false
        }
      }
    },
    async viewFile(commit) {
      const roomId = this.file.roomId
      const fileId = this.file.id
      const commitId = commit.id
      await this.$store.dispatch('file/viewFile', { roomId, fileId, commitId })
      this.change_viewingCommit(commitId)
      this.scrolltoaCommit(commitId)
    },
    Warning(warningText) {
      this.$emit('openModal', warningText)
    },
  },
}
</script>

<style scoped>
.commit-container {
  user-select: text;
  padding-top: 30px;
  height: 100%;
  overflow: auto;
}

.commit-container-modified-true {
  user-select: text;
  padding-top: 30px;
  height: calc(100% - var(--commit-maker-height));
  overflow: auto;
}

.commit-container-modified-true > div,
.commit-container > div {
  position: relative;
}

.commit-container-modified-true img,
.commit-container img {
  user-select: none;
}

.commit-container-modified-true .comments-panel .file-controls,
.commit-container .comments-panel .file-controls {
  opacity: 0;
}

.comments-panel .committer-info .file-controls {
  position: absolute;
  top: 0;
  right: 0;
}

.commit-container-modified-true .comments-panel:hover .file-controls,
.commit-container .comments-panel:hover .file-controls {
  opacity: 1;
}

.commit-graph {
  position: absolute;
  top: 0;
  left: var(--commit-graph-left);
  bottom: 0;
}

.commit-circle {
  width: var(--commit-circle-size);
  height: var(--commit-circle-size);
  border-radius: 50%;
  background: center/cover no-repeat;
}

.enhance {
  border-style: solid;
  border-color: green;
  border-width: 3pt;
}

.commit-line {
  width: 5px;
  position: absolute;
  top: var(--commit-circle-size);
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  background: var(--color-blue);
}

.comments-panel {
  margin-left: 90px;
  margin-right: 30px;
  padding-bottom: 40px;
}

.comments-panel .comment {
  position: relative;
  margin-top: 12px;
}

.comments-panel .comment-circle {
  width: var(--comment-circle-size);
  height: var(--comment-circle-size);
  border-radius: 50%;
  background: center/cover no-repeat;
  position: absolute;
  top: 3px;
  left: 0;
}

.comments-panel .comment-body {
  margin-left: var(--comment-circle-size);
  padding-left: 15px;
}

.comments-panel .committer-info {
  position: relative;
  padding-right: 70px;
}

.comments-panel .committer-info .file-controls .file-controls-icon {
  display: inline-block;
  padding: 3px;
  cursor: pointer;
  margin-left: 5px;
  margin-top: -4px;
  font-size: 18px;
  color: var(--color-border);
  transition: 0.2s;
}

.comments-panel .committer-info .file-controls .file-controls-icon:hover {
  color: unset;
}

.comments-panel .committer-name,
.comments-panel .comment-username {
  font-weight: bold;
  display: inline-block;
}

.comments-panel .committer-date,
.comments-panel .comment-date {
  font-size: 12px;
  color: var(--color-date);
}

.comments-panel .committer-message {
  padding: 2px 15px 10px 0;
}

.comments-panel .comment-input {
  margin-top: 25px;
}

.comments-panel .comment-input input {
  border: none;
  background: var(--color-sub);
  font-size: 16px;
  padding: 10px;
  width: 100%;
  color: var(--font-base);
  border-radius: 5px;
  user-select: none;
}

.comments-panel .comment-input input::placeholder {
  color: var(--color-date);
  font-size: 14px;
}

.comments-panel .comment-input input:focus {
  outline: none;
}

.commit-maker {
  height: var(--commit-maker-height);
  border-top: 1px solid var(--color-border);
  position: relative;
}

.commit-maker .comments-panel {
  padding-top: 1px;
}

.commit-maker .commit-maker-graph {
  position: absolute;
  top: 18px;
  left: var(--commit-graph-left);
}

.commit-maker .comment-maker-text {
  font-size: 12px;
  color: var(--font-base);
  overflow: hidden;
  white-space: nowrap;
}

.commit-maker .comment-input {
  margin-top: 12px;
}

.blink {
  animation: blinkAnime 0.8s infinite alternate;
}

@keyframes blinkAnime {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.dialog >>> .el-dialog__body {
  padding: 20px 40px 50px;
}

.dialog >>> .v-modal,
.dialog >>> .el-dialog__wrapper {
  top: var(--titlebar-height);
}
</style>
