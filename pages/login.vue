<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">diraq_desktop</h1>
      <h2 class="subtitle">Welcome {{ name }}</h2>
      <div class="login">
        <input v-model="login_token" id="input_token" type="text" />
        <p>
          <nuxt-link to="/user"><button @click="login">ログイン</button></nuxt-link>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { ipcRenderer } from 'electron'
export default {
  //middleware, storeでthis.prelogin_emailが空の時新規登録に戻す
  asyncData() {
    return new Promise(resolve => {
      ipcRenderer.once('user-name-reply', (event, name) => {
        resolve({ name })
      })
      ipcRenderer.send('user-name-request')
    })
  },
  data() {
    return {
      prelogin_email: '',
      login_token: '',
    }
  },
  components: {
    Logo,
  },
  methods: {
    // async prelogin() {
    //   ipcRenderer.send('prelogin', this.prelogin_email)
    //   redirect('/login')
    // },
    async login() {
      ipcRenderer.send('login', this.login_token)
    },
    // async logout() {
    //   ipcRenderer.send('logout')
    // },
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
