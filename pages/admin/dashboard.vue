<template>
  <div>
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
</template>

<script>
import { mapState } from 'vuex'

export default {
  fetch({ store }) {
    return store.dispatch('user/getUserInfo')
  },
  destroyed() {
    this.$store.commit('user/clearUserInfo')
  },
  computed: {
    ...mapState('user', ['name']),
  },
  methods: {
    async logout() {
      await this.$store.dispatch('login/logout')
      this.$router.push('/login')
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
