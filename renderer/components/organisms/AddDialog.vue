<template>
  <div class="dialog-container">
    <div class="invite-member">
      <div>
        <h1 class="title">Invite box</h1>
        <div class="format">
          <el-input v-model="email" placeholder="Please input e-mail" type="email" clearable />
        </div>
        <div class="format">
          <el-button type="info" :disabled="notHaveEmail" @click="invite">Invite</el-button>
        </div>
        <h3>{{ comment }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      comment: '',
    }
  },
  computed: {
    notHaveEmail() {
      // eslint-disable-next-line no-useless-escape
      return !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        this.email,
      )
    },
  },
  methods: {
    async invite() {
      const email = this.email
      const roomId = this.$store.state.room.roomId
      this.comment = await this.$store.dispatch('invite/getUserInfo', { email, roomId })
      this.email = ''
    },
  },
}
</script>

<style scoped>
.dialog-container {
  display: flex;
  justify-content: space-between;
}

.invite-member {
  position: relative;
  width: 100%;
}

.title {
  line-height: 24px;
  font-size: 20px;
  color: #303133;
  margin-bottom: 30px;
}
.format {
  display: flex;
  margin-bottom: 25px;
  width: 100%;
}
</style>
