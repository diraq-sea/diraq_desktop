<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">diraq_desktop</h1>
      <h2 class="subtitle">DiraQ desktop application</h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
      <div v-if="before_login == true">
        <div class="email">
          <input v-model="prelogin_email" id="input_email" type="text" />
          <p><button @click="prelogin">登録</button></p>
        </div>
      </div>
      <div v-else>
        <div class="login">
          <input v-model="login_token" id="input_token" type="text" />
          <p><button @click="login">ログイン</button></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { ipcRenderer } from 'electron'
export default {
  data() {
    return {
      prelogin_email: '',
      before_login: true,
      login_token: '',
    }
  },
  components: {
    Logo,
  },
  methods: {
    async prelogin() {
      ipcRenderer.send('prelogin', this.prelogin_email)
      this.before_login = false
    },
    async login() {
      //console.log(this.login_token)
      ipcRenderer.send('login', this.login_token)
      // ipcRenderer.on('reply', (event, arg) => {
      //   console.log(arg)
      // })
    },
  },
}
</script>

<style>
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

.links {
  padding-top: 15px;
}
</style>
