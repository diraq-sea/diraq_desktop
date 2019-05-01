<template>
  <div>
    <h1 class="title">diraq_desktop</h1>
    <h2 class="subtitle">Welcome {{ name }}</h2>
    名前
    <p><input v-model="invitee_name" type="text" /></p>
    メールアドレス
    <p><input v-model="invitee_email" type="text" /></p>
    <p><button @click="invite">招待</button></p>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
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
  methods: {
    invite() {
      ipcRenderer.send('invite-token-request')
    },
  },
}
</script>

<style scoped>
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
