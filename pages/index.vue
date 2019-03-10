<template>
  <div />
</template>

<script>
export default {
  mounted() {
    // 元々fetch+redirectだったがタブ切り替え時エラー回避のため暫定でmounted使用
    const currentTab = this.$store.getters['tab/currentTab']

    if (this.$store.getters['tab/isRoomTab'](currentTab)) {
      this.$router.push('/room')
    } else if (this.$store.getters['tab/isFolderTab'](currentTab)) {
      this.$router.push('/folder')
    } else {
      this.$router.push('/file')
    }
  },
}
</script>
