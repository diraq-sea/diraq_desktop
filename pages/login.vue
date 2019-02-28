<template>
  <div class="body">
    <card title="Welcome to DiraQ">
      <div class="signin">Sign in from here</div>
      <div class="format">
        <el-input placeholder="Please input e-mail" v-model="email" type="email" clearable />
        <el-button type="info" @click="prelogin" :disabled="notHaveEmail">send</el-button>
      </div>
      <div class="format">
        <el-input placeholder="Please input token" v-model="loginToken" type="text" clearable />
        <el-button type="info" @click="login" :disabled="notHaveToken">send</el-button>
      </div>
    </card>
  </div>
</template>

<script>
import Card from '~/components/atoms/Card'

export default {
  layout: 'login',
  components: {
    Card,
  },
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
      // eslint-disable-next-line no-useless-escape
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

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

.body {
  position: fixed;
  top: $NAVBAR_HEIGHT;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
