<template>
  <div class="body">
    <card title="Welcome to DiraQ">
      <div class="format">
        <el-input v-model="name" placeholder="Please input user-name" type="name" clearable />
      </div>
      <div class="format">
        <el-input v-model="email" placeholder="Please input e-mail" type="email" clearable />
      </div>
      <div class="format">
        <el-input
          v-model="password"
          placeholder="Please input password"
          type="password"
          clearable
        />
      </div>
      <div class="format">
        <el-input
          v-model="confirmPassword"
          placeholder="Please confirm your password"
          type="password"
          clearable
        />
      </div>
      <div class="format">
        <el-button
          type="info"
          :disabled="notHaveEmail || notHavePassword || notSamePassword"
          @click="signup"
          >Sign Up</el-button
        >
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
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  computed: {
    notHaveEmail() {
      // eslint-disable-next-line no-useless-escape
      return !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        this.email,
      )
    },
    notHavePassword() {
      return this.password.length < 8
    },
    notSamePassword() {
      return this.password !== this.confirmPassword
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
    async signup() {
      const name = this.name
      const email = this.email
      const password = this.password
      await this.$store.dispatch('signup/signup', { name, email, password })
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.body {
  position: fixed;
  top: var(--navbar-height);
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
