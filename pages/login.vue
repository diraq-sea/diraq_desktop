<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">diraq_desktop</h1>
      <div>
        <input v-model="email" type="text" />
        <p><button @click="prelogin">Tokenをメールに送信する</button></p>
      </div>
      <div>
        <input v-model="loginToken" type="text" />
        <p><button @click="login">Tokenをコピペしてログイン</button></p>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
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
  components: {
    Logo,
  },
  methods: {
    prelogin() {
      return this.$store.dispatch('login/prelogin', this.email)
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
}

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
