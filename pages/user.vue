<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">diraq_desktop</h1>
      <h2 class="subtitle">Welcome {{ name }}</h2>
      <div class="invite">
        <nuxt-link to="/invite">
          <p><button>招待する</button></p>
        </nuxt-link>
      </div>
      <div class="logout">
        <p><button @click="logout">ログアウト</button></p>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { ipcRenderer } from 'electron'
//import { mapMutations } from 'vuex'
export default {
  middleware: 'user', //middleware, storeでthis.login_tokenが空の時loginに戻す
  asyncData() {
    return new Promise(resolve => {
      ipcRenderer.once('user-name-reply', (event, name) => {
        resolve({ name })
      })
      ipcRenderer.send('user-name-request')
    })
  },
  // computed: {
  //   name: function() {
  //     this.$store.dispatch('user/get_name')
  //     return this.$store.getters['user/user_name']
  //   },
  // },
  // data() {
  //   return {
  //     name: this.$store.getters['user/user_name'],
  //   }
  // },
  components: {
    Logo,
  },
  methods: {
    async logout() {
      ipcRenderer.send('logout')
      this.$router.push('/login')
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
