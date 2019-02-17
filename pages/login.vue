<template>
  <div>
    <div class="body">
      <div class="login-container">
        <div class="greeding">Welcome to DiraQ</div>
        <div class="signin">Sign in from here</div>
        <div class="format">
          <el-input placeholder="Please input e-mail" v-model="email" type="email" clearable />
          <el-button type="info" @click="prelogin" :disabled="notHaveEmail">send</el-button>
        </div>
        <div class="format">
          <el-input placeholder="Please input token" v-model="loginToken" type="text" clearable />
          <el-button type="info" @click="login" :disabled="notHaveToken">send</el-button>
        </div>
      </div>
    </div>
  </div>
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
  computed: {
    notHaveEmail() {
      return !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        this.email,
      )
    },
    notHaveToken() {
      return this.loginToken.length < 192
    },
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
.body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  color: #333;
  line-height: 20px;
  font-weight: 400;
  background: #fff;
  border-radius: 6px;
  padding: 30px 40px;
  border: 1px solid rgb(216, 216, 216);
  box-shadow: rgba(122, 122, 122, 0.0588235) 0px 0px 6px 3px;
}

.greeding {
  text-align: center;
  letter-spacing: 0.05em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-bottom: 10px;
  box-sizing: border-box;
  color: #202124;
  font-weight: bold;
  font-size: 27px;
  font-weight: 300;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

.signin {
  margin: 20px 5px;
  color: #6a6e77;
}
.format {
  display: flex;
  margin-bottom: 25px;
  width: 400px;
}

.el-input {
  margin-right: 15px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
