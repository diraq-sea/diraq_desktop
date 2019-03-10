<template>
  <div />
</template>

<script>
export default {
  fetch({ redirect, store }) {
    const currentTab = store.getters['tab/currentTab']
    if (store.getters['tab/isRoomTab'](currentTab)) {
      redirect('/room')
    } else if (store.getters['tab/isFolderTab'](currentTab)) {
      redirect('/folder')
    } else {
      redirect('/file')
    }
  },
}
</script>
