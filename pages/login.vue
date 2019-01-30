<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">diraq_desktop</h1>
      <div class="login">
        <input v-model="login_token" id="input_token" type="text" />
        <p><button @click="login">ログイン</button></p>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { ipcRenderer } from 'electron'
import { mapMutations } from 'vuex'
export default {
  //middleware, storeでthis.prelogin_emailが空の時新規登録に戻す,二重ログイン防ぐ,loginしてるとuserへ
  middleware: 'login',
  data() {
    return {
      login_token: '',
    }
  },
  components: {
    Logo,
  },
  methods: {
    async login() {
      ipcRenderer.send('login', this.login_token)
      ipcRenderer.on('login-reply', async (event, arg) => {
        this.$router.push('/user')
      })
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
