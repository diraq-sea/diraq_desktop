<template>
  <div />
</template>

<script>
export default {
  fetch({ store, redirect }) {
    redirect(`/admin/${store.state.menu.menuPath.path}`)
  },
}
</script>
