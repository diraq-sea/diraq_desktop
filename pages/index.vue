<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">diraq_desktop</h1>
      <div class="email">
        <input v-model="prelogin_email" id="input_email" type="text" />
        <p><button @click="prelogin">登録</button></p>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { ipcRenderer } from 'electron'
export default {
  middleware: 'prelogin',
  data() {
    return {
      prelogin_email: '',
    }
  },
  components: {
    Logo,
  },
  methods: {
    async prelogin() {
      ipcRenderer.send('prelogin', this.prelogin_email)
      ipcRenderer.on('prelogin-reply', async (event, arg) => {
        this.$router.push('/login')
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
