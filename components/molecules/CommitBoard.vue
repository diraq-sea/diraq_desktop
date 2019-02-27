<template>
  <div class="commit-container">
    <div v-for="commit in commits" :key="commit.id">
      <div class="commit-graph">
        <div class="commit-circle" :style="circleStyle(commit.user)" />
        <div v-if="hasChild(commit.id)" class="commit-line" />
      </div>
      <div class="comments-panel">
        <span class="committer-name">{{ user(commit.user).name }}</span>
        <span class="committer-date">{{ $moment(commit.date).format('YY/MM/DD HH:mm:ss') }}</span>
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
    padding: 2px 0 10px;
  }
}
</style>
