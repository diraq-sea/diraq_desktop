<template>
  <div class="header">
    <div class="header-inner">
      <div class="title">Dira<span>Q</span></div>
      <div v-if="isLoggedIn" class="user">
        <el-tooltip placement="bottom-end" effect="light" :manual="true" :value="isOpeningUser">
          <div slot="content">
            <div class="user-item" @click="$emit('logout')">
              <i class="fas fa-power-off" /><span>Logout</span>
            </div>
          </div>

          <div :class="buttonClass" class="user-button" @click.stop="toggleOpenUser">
            {{ name }}
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
    name: {
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
    buttonClass() {
      return {
        opening: this.isOpeningUser,
      }
    },
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

.header {
  background: $COLOR_DARK;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.header-inner {
  line-height: $NAVBAR_HEIGHT;
  height: $NAVBAR_HEIGHT;
  margin: 0 30px;
  position: relative;
}

.title {
  font-family: 'Times New Roman', 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: bold;
  font-size: 24px;
  color: #fff;
  letter-spacing: 1px;
}

.title > span {
  color: $COLOR_ACCENT;
}

.user {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}

.user-button {
  height: $NAVBAR_HEIGHT;
  color: $FONT_WHITE;
  cursor: pointer;
  transition: 0.2s;
  padding: 0 20px;

  &.opening,
  &:hover {
    background: #66666633;
  }
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
