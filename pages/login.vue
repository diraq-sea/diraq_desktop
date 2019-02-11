<template>
  <section class="container">
    <div>
      <h1 class="title">Dira<span>Q</span></h1>
      <div class="format">
        <el-input
          placeholder="Please input e-mail"
          v-model="email"
          type="text"
          clearable
        ></el-input>
        <p><el-button type="info" @click="prelogin" :disabled="emailStyle()">send</el-button></p>
      </div>
      <div class="format">
        <el-input
          placeholder="Please input token"
          v-model="loginToken"
          type="text"
          clearable
        ></el-input>
        <p><el-button type="info" @click="login" :disabled="tokenStyle()">send</el-button></p>
      </div>
    </div>
  </section>
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapMutations } from 'vuex'
export default {
  layout: 'login',
  async asyncData({ store }) {
    await store.dispatch('login/getAuthEmail')
    return {
      email: store.state.login.email,
    }
  },
  data() {
    return {
      loginToken: '',
    }
  },
  methods: {
    async prelogin() {
      await this.$store.dispatch('login/prelogin', this.email)
      this.$message('Please check your e-mail')
    },
    async login() {
      await this.$store.dispatch('login/login', this.loginToken)
      this.$router.push('/')
    },
    emailStyle() {
      return !this.email.match(/@/) || this.email.length < 10
    },
    tokenStyle() {
      return this.loginToken.length < 192
    },
  },
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #2c38a82f;
}

.title {
  font-family: 'Times New Roman', 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: right;
  font-size: 85px;
  color: #0c173d;
  letter-spacing: 1px;
  margin-bottom: 50px;
}

.title > span {
  color: #e5ec00;
}

.format {
  display: flex;
  margin-bottom: 20px;
}

.el-input {
  margin-right: 10px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
