<template>
  <div>
    <div v-for="commit in commits" :key="commit.id" class="commit-container">
      <div class="commit-graph">
        <div class="commit-circle" :style="circleStyle(commit.user)">
          <div>
            <div class="commit-circle-name">
              <span>{{ user(commit.user).name }}</span>
              <span>{{ $moment(commit.date).format('YY/MM/DD HH:mm:ss') }}</span>
            </div>
            <div class="commit-circle-message">{{ commit.message }}</div>
          </div>
        </div>
        <div v-if="hasChild(commit.id)" class="commit-line" />
      </div>
      <div class="comments-panel">
        <div v-for="comment in commit.comments" :key="comment.id">
          <div>
            <img :src="user(comment.user).icon" /><span>{{ user(comment.user).name }}</span>
            <span>{{ $moment(comment.date).format('YY/MM/DD HH:mm:ss') }}</span>
          </div>
          <div>{{ comment.comment }}</div>
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

$GRAPH_WIDTH: 100px;
$CIRCLE_SIZE: 40px;
$LINE_COLOR: #569cb3;

.commit-container {
  position: relative;
}

.commit-graph {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: $GRAPH_WIDTH;
}

.commit-circle {
  width: $CIRCLE_SIZE;
  height: $CIRCLE_SIZE;
  border-radius: 50%;
  background: center/cover no-repeat;
  margin: 0 auto;
  position: relative;

  & > div {
    position: absolute;
    left: $CIRCLE_SIZE;
    top: 0;
    width: 500px;
    padding-left: 15px;
  }
}

.commit-line {
  width: 5px;
  position: absolute;
  top: $CIRCLE_SIZE;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  background: $LINE_COLOR;
}

.comments-panel {
  margin-left: $GRAPH_WIDTH;
  padding-top: $CIRCLE_SIZE;
  padding-bottom: 40px;

  & > div:first-child {
    padding-top: 25px;
  }
}
</style>
