<template>
  <div>
    <div class="commit-container">
      <div v-for="commit in file.commits" :key="commit.id">
        <div class="commit-graph">
          <div class="commit-circle" :style="circleStyle(user(commit.user).icon)" />
          <div v-if="hasChild(commit.id)" class="commit-line" />
        </div>
        <div class="comments-panel">
          <div class="committer-info">
            <span class="committer-name">{{ user(commit.user).name }}</span>
            <span class="committer-date">{{ formattedDate(commit.date) }}</span>
            <div class="file-controls">
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

          <div v-for="comment in commit.comments" :key="comment.id" class="comment">
            <div class="comment-circle" :style="circleStyle(user(comment.user).icon)" />
            <div class="comment-body">
              <span class="comment-username">{{ user(comment.user).name }}</span>
              <span class="comment-date">{{ formattedDate(comment.date) }}</span>
              <div class="comment-message">{{ comment.comment }}</div>
            </div>
          </div>

          <div class="comment">
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
          <input v-model="commitComment" type="text" placeholder="Input comment for uploading..." />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { DATE_FORMAT_TYPE } from '~/utils/const'

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
  computed: {
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
  data() {
    return {
      values: [],
      commitComment: '',
    }
  },
  methods: {
    inputComment(commitId, e) {
      this.values = [...this.values]
      const index = this.file.commits.findIndex(commit => commit.id === commitId)
      this.values[index] = e.target.value
    },
    async submitComment(commitId) {
      const index = this.file.commits.findIndex(commit => commit.id === commitId)
      const comment = this.values[index]
      const fileId = this.file.id

      if (comment) {
        await this.$store.dispatch('file/addComment', { commitId, comment })
        await this.$store.dispatch('file/fetchFile', fileId)
        this.values = [...this.values]
        this.values[index] = ''
      }
    },
    async submitCommit() {
      if (this.commitComment) {
        const commitComment = this.commitComment
        const fileId = this.file.id
        await this.$store.dispatch('file/addCommit', { fileId, commitComment })
        await this.$store.dispatch('file/fetchFile', fileId)
        this.commitComment = ''
      }
    },
    async editFile(commit) {
      await this.$store.dispatch('file/editFile', {
        extname: this.file.extname,
        commit,
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

$COMMENT_CIRCLE_SIZE: 32px;
$COMMIT_MAKER_HEIGHT: 102px;
$COMMIT_GRAPH_LEFT: 35px;

.commit-container {
  user-select: text;
  padding-top: 30px;
  height: calc(100% - #{$COMMIT_MAKER_HEIGHT});
  overflow: auto;

  & > div {
    position: relative;
  }

  img {
    user-select: none;
  }

  .comments-panel {
    .file-controls {
      opacity: 0;
    }

    &:hover .file-controls {
      opacity: 1;
    }
  }
}

.commit-graph {
  position: absolute;
  top: 0;
  left: $COMMIT_GRAPH_LEFT;
  bottom: 0;
}

.commit-circle {
  width: $COMMIT_CIRCLE_SIZE;
  height: $COMMIT_CIRCLE_SIZE;
  border-radius: 50%;
  background: center/cover no-repeat;
}

.commit-line {
  width: 5px;
  position: absolute;
  top: $COMMIT_CIRCLE_SIZE;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  background: $COLOR_BLUE;
}

.comments-panel {
  margin-left: 90px;
  margin-right: 30px;
  padding-bottom: 40px;

  .comment {
    position: relative;
    margin-top: 12px;
  }

  .comment-circle {
    width: $COMMENT_CIRCLE_SIZE;
    height: $COMMENT_CIRCLE_SIZE;
    border-radius: 50%;
    background: center/cover no-repeat;
    position: absolute;
    top: 3px;
    left: 0;
  }

  .comment-body {
    margin-left: $COMMENT_CIRCLE_SIZE;
    padding-left: 15px;
  }

  .committer-info {
    position: relative;
    padding-right: 70px;

    .file-controls {
      position: absolute;
      top: 0;
      right: 0;

      .file-controls-icon {
        display: inline-block;
        padding: 3px;
        cursor: pointer;
        margin-left: 5px;
        margin-top: -4px;
        font-size: 18px;
        color: $COLOR_BORDER;
        transition: 0.2s;

        &:hover {
          color: unset;
        }
      }
    }
  }

  .committer-name,
  .comment-username {
    font-weight: bold;
    display: inline-block;
  }

  .committer-date,
  .comment-date {
    font-size: 12px;
    color: $COLOR_DATE;
  }

  .committer-message {
    padding: 2px 15px 10px 0;
  }

  .comment-input {
    margin-top: 25px;

    input {
      border: none;
      background: $COLOR_SUB;
      font-size: 16px;
      padding: 10px;
      width: 100%;
      color: $FONT_BASE;
      border-radius: 5px;
      user-select: none;

      &::placeholder {
        color: $COLOR_DATE;
        font-size: 14px;
      }

      &:focus {
        outline: none;
      }
    }
  }
}

.commit-maker {
  height: $COMMIT_MAKER_HEIGHT;
  border-top: 1px solid $COLOR_BORDER;
  position: relative;

  .comments-panel {
    padding-top: 12px;
  }

  .commit-maker-graph {
    position: absolute;
    top: 18px;
    left: $COMMIT_GRAPH_LEFT;
  }

  .comment-maker-text {
    font-size: 12px;
    color: $FONT_BASE;
    overflow: hidden;
    white-space: nowrap;
  }

  .comment-input {
    margin-top: 12px;
  }
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
</style>
