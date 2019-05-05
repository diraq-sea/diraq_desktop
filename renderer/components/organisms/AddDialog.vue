<template>
  <div class="dialog-container">
    <div class="invite-member">
      <div>
        <h1 class="title">Welcome</h1>
        メールアドレス
        <p><input type="text" v-model="invitee_email" /></p>
        <p><button>追加</button></p>
        <p><button @click="invite">招待</button></p>
        <h3>{{ comment }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      invitee_email: '',
      comment: '',
    }
  },

  methods: {
    async invite() {
      const email = this.invitee_email
      const roomId = this.$store.state.room.roomId
      if (!email) {
        this.comment = 'メールアドレスを入力してください'
      } else {
        this.comment = await this.$store.dispatch('invite/getUserInfo', { email, roomId })
      }
      this.invitee_email = ''
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
</style>
