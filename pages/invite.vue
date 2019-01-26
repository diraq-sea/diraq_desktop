<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">diraq_desktop</h1>
      <h2 class="subtitle">Welcome {{ name }}</h2>
      名前
      <p><input type="text" v-model="invitee_name" /></p>
      メールアドレス
      <p><input type="text" v-model="invitee_email" /></p>
      <p><button @click="invite">招待</button></p>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { ipcRenderer } from 'electron'
export default {
  middleware: 'user', //middleware, storeでthis.login_tokenが空の時loginに戻す
  data() {
    return {
      invitee_name: '',
      invitee_email: '',
    }
  },
  asyncData() {
    return new Promise(resolve => {
      ipcRenderer.once('user-name-reply', (event, name) => {
        resolve({ name })
      })
      ipcRenderer.send('user-name-request')
    })
  },
  components: {
    Logo,
  },
  methods: {
    async invite() {
      ipcRenderer.send('invite-token-request')
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
