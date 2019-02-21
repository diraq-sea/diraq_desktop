<template>
  <div class="body">
    <card title="Welcome to DiraQ">
      <div class="label">Select empty working directory</div>
      <input type="file" webkitdirectory @change="onChange" />
    </card>
  </div>
</template>

<script>
import Card from '~/components/atoms/Card'
import fs from 'fs'

export default {
  layout: 'directory',
  components: {
    Card,
  },
  methods: {
    async onChange(e) {
      const dirPath = e.target.files[0].path

      if (fs.readdirSync(dirPath).length) {
        alert('空のディレクトリを指定してください')
        e.target.value = null
      } else {
        await this.$store.dispatch('workingDir/setDirPath', dirPath)
        this.$router.push('/')
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

.body {
  position: fixed;
  top: $NAVBAR_HEIGHT;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.label {
  margin: 20px 5px;
  color: #6a6e77;
}
</style>
