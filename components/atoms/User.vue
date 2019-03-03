<template>
  <div class="self-user">
    <el-tooltip placement="bottom-end" effect="light" :manual="true" :value="isOpeningUser">
      <div slot="content">
        <div class="user-name">{{ name }}</div>
        <div class="user-item" @click="$emit('logout')">
          <i class="fas fa-power-off" /><span>Logout</span>
        </div>
      </div>

      <div :style="userStyle" class="user-button" @click.stop="toggleOpenUser" />
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
  computed: {
    userStyle() {
      return { backgroundImage: `url(${this.icon})` }
    },
  },
  data() {
    return {
      isOpeningUser: false,
    }
  },
  mounted() {
    window.addEventListener('click', this.closeOpenUser, false)
  },
  destroyed() {
    window.removeEventListener('click', this.closeOpenUser, false)
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

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

.self-user {
  width: $MEMBERS_WIDTH;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-button {
  width: $ICON_SIZE_SMALL;
  height: $ICON_SIZE_SMALL;
  border-radius: 50%;
  background: center/cover no-repeat;
  cursor: pointer;
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

  i {
    margin-right: 8px;
  }
}
</style>
