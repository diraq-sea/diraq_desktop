<template>
  <div class="header">
    <div class="header-inner">
      <div class="title">Dira<span>Q</span></div>
    </div>
  </div>
</template>

<style scoped>
.header {
  background: var(--color-dark);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.header-inner {
  line-height: var(--navbar-height);
  height: var(--navbar-height);
  margin: 0 70px;
  position: relative;
}

.title {
  font-family: 'Times New Roman', 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: bold;
  font-size: 30px;
  color: #fff;
  letter-spacing: 1px;
}

.title > span {
  color: var(--color-accent);
}
</style>
