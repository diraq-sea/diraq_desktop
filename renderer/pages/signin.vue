<template>
  <div>
    <h1 class="title">Sing In</h1>
    名前
    <p><input v-model="invitee_name" type="text" /></p>
    メールアドレス
    <p><input v-model="invitee_email" type="text" /></p>
    <p><button @click="signIn">登録</button></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      invitee_name: '',
      invitee_email: '',
    }
  },
  methods: {
    async signIn() {
      const name = this.invitee_name
      const email = this.invitee_email
      await this.$store.dispatch('user/newUserInfo', { name, email })
    },
  },
}
</script>

<style scoped>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
