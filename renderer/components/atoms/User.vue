<template>
  <div class="self-user">
    <el-tooltip placement="bottom-end" effect="light" :manual="true" :value="isOpeningUser">
      <div slot="content">
        <div class="user-name">{{ name }}</div>
        <div class="user-item" @click="$emit('logout')">
          <i class="fas fa-power-off" /><span>Logout</span>
        </div>
      </div>

      <div :style="userStyle" class="user-button" @mousedown.stop="toggleOpenUser" />
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpeningUser: false,
    }
  },
  computed: {
    userStyle() {
      return { backgroundImage: `url(${this.icon})` }
    },
  },
  mounted() {
    window.addEventListener('mousedown', this.closeOpenUser, false)
  },
  destroyed() {
    window.removeEventListener('mousedown', this.closeOpenUser, false)
  },
  methods: {
    toggleOpenUser() {
      this.isOpeningUser = !this.isOpeningUser
    },
    closeOpenUser() {
      this.isOpeningUser = false
    },
  },
}
</script>

<style scoped>
.self-user {
  width: var(--members-width);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-button {
  width: var(--icon-size-small);
  height: var(--icon-size-small);
  border-radius: 50%;
  background: center/cover no-repeat;
  cursor: pointer;
  -webkit-app-region: no-drag;
}

.user-name {
  font-weight: bold;
  border-bottom: 1px solid #bbb;
  text-align: center;
  font-size: 12px;
  padding-bottom: 3px;
  margin-bottom: 8px;
}

.user-item {
  padding: 2px 8px 2px 5px;
  font-size: 14px;
  display: block;
  cursor: pointer;
  color: #333;
}

.user-item i {
  margin-right: 8px;
}
</style>
