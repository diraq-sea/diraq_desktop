<template>
  <div class="commit-container">
    <div v-for="commit in commits" :key="commit.id">
      <div class="commit-graph">
        <div class="commit-circle" :style="circleStyle(commit.user)" />
        <div v-if="hasChild(commit.id)" class="commit-line" />
      </div>
      <div class="comments-panel">
        <div class="committer-info">
          <span class="committer-name">{{ user(commit.user).name }}</span>
          <span class="committer-date">{{ $moment(commit.date).format('YY/MM/DD HH:mm:ss') }}</span>
          <div class="file-controls">
            <div
              class="file-controls-icon"
              title="Edit file"
              @click="$store.dispatch('file/editFile', commit)"
            >
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
          <div class="comment-circle" :style="circleStyle(comment.user)" />
          <div class="comment-body">
            <span class="comment-username">{{ user(comment.user).name }}</span>
            <span class="comment-date">
              {{ $moment(comment.date).format('YY/MM/DD HH:mm:ss') }}
            </span>
            <div class="comment-message">{{ comment.comment }}</div>
          </div>
        </div>

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
</template>

<script>
export default {
  props: {
    commits: {
      type: Array,
      required: true,
    },
    currentCommit: {
      type: Object,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
  },
  computed: {
    user() {
      return id => this.users.find(user => user.id === id)
    },
    hasChild() {
      return id => this.commits.find(commit => commit.parents.includes(id))
    },
    circleStyle() {
      return id => ({ backgroundImage: `url(${this.user(id).icon})` })
    },
    value() {
      return id => this.values[this.commits.findIndex(commit => commit.id === id)]
    },
    downloadingName() {
      const nameParts = this.filename.split('.')
      return `${nameParts.slice(0, -1).join('.')}_${this.currentCommit.id}.${nameParts.pop()}`
    },
  },
  data() {
    return { values: [] }
  },
  methods: {
    inputComment(id, e) {
      this.values = [...this.values]
      const index = this.commits.findIndex(commit => commit.id === id)
      this.values[index] = e.target.value
    },
    submitComment(id) {
      const index = this.commits.findIndex(commit => commit.id === id)
      const value = this.values[index]

      if (value) {
        this.$emit('addComment', { id, value })
        this.values = [...this.values]
        this.values[index] = ''
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

$CIRCLE_SIZE: 40px;
$CIRCLE_SIZE2: 32px;

.commit-container {
  user-select: text;
  padding-top: 30px;

  & > div {
    position: relative;
  }

  img {
    user-select: none;
  }
}

.commit-graph {
  position: absolute;
  top: 0;
  left: 35px;
  bottom: 0;
}

.commit-circle {
  width: $CIRCLE_SIZE;
  height: $CIRCLE_SIZE;
  border-radius: 50%;
  background: center/cover no-repeat;
}

.commit-line {
  width: 5px;
  position: absolute;
  top: $CIRCLE_SIZE;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  background: $COLOR_BLUE;
}

.comments-panel {
  margin-left: 90px;
  padding-bottom: 40px;

  .comment {
    position: relative;
    margin-top: 12px;
  }

  .comment-circle {
    width: $CIRCLE_SIZE2;
    height: $CIRCLE_SIZE2;
    border-radius: 50%;
    background: center/cover no-repeat;
    position: absolute;
    top: 0;
    left: 0;
  }

  .comment-body {
    margin-left: $CIRCLE_SIZE2;
    padding-left: 15px;
  }

  .committer-info {
    position: relative;
    padding-right: 80px;

    .file-controls {
      position: absolute;
      top: 0;
      right: 10px;
      opacity: 0;

      .file-controls-icon {
        display: inline-block;
        padding: 3px;
        cursor: pointer;
        margin-right: 5px;
        margin-top: -4px;
        font-size: 18px;
      }
    }
  }

  &:hover .file-controls {
    opacity: 1;
  }

  .committer-name,
  .comment-username {
    font-weight: bold;
    display: inline-block;
    margin-right: 5px;
  }

  .committer-date,
  .comment-date {
    font-size: 12px;
    color: $FONT_GRAY;
  }

  .committer-message {
    padding: 2px 15px 10px 0;
  }

  .comment-input {
    margin-top: 25px;
    margin-right: 30px;

    input {
      border: none;
      background: $COLOR_GRAY3;
      font-size: 16px;
      padding: 10px;
      width: 100%;
      color: $FONT_WHITE;
      border-radius: 5px;

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
