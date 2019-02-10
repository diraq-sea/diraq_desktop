<template>
  <section class="container">
    <div>
      <h1 class="title">Dira<span>Q</span></h1>
      <div class="format">
        <el-input placeholder="Please input e-mail" v-model="email" type="text"></el-input>
        <p><el-button type="primary" @click="prelogin">send</el-button></p>
      </div>
      <div class="format">
        <el-input placeholder="Please input token" v-model="loginToken" type="text"></el-input>
        <p><el-button type="primary" @click="login">send</el-button></p>
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
  background: #0300a342;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: right;
  font-size: 70px;
  color: #0071eb;
  letter-spacing: 1px;
  margin-bottom: 30px;
}

.title > span {
  color: #ebe700;
}

.format {
  display: flex;
  margin-bottom: 20px;
}

.el-input {
  margin-right: 10px;
}

.el-button--primary {
  color: #fff;
  background-color: rgb(111, 138, 255);
  border-color: rgb(111, 138, 255);
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
