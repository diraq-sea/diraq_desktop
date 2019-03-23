<template>
  <div class="dialog-container">
    <div class="create-new">
      <p class="title">Create new</p>
      <el-radio-group class="file-or-folder" v-model="isFile">
        <el-radio-button class="new new-file" :label="true">file</el-radio-button>
        <el-radio-button :label="false" class="new new-folder">folder</el-radio-button>
      </el-radio-group>
      <transition name="fade">
        <el-radio-group v-if="isFile" class="radio2" v-model="extTypeId">
          <div class="select-file">
            <div class="files">
              <el-radio
                v-for="file in leftFiles"
                :key="file.id"
                :label="file.id"
                class="radio2group"
                >{{ file.label }}</el-radio
              >
            </div>
            <div class="files">
              <el-radio
                v-for="file in rightFiles"
                :key="file.id"
                :label="file.id"
                class="radio2group"
              >
                {{ file.label }}
              </el-radio>
            </div>
          </div>
        </el-radio-group>
      </transition>
      <form class="inputbox" @submit.prevent="createNew">
        <el-input :placeholder="placeholder" v-model="inputValue" class="input-with-select">
          <el-button slot="append" :disabled="hasValue" native-type="submit"> Create </el-button>
        </el-input>
      </form>
    </div>
    <div class="border"></div>
    <div class="upload-new">
      <p class="title">Upload new file</p>
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="text/picture/picture-card/pdf"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        <div class="el-upload__tip">files with a size less than 512mb</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import FILE_EXT_TYPES from '~/common/fileExtTypes'

export default {
  data() {
    return {
      fileList: [],
      isFile: true,
      extTypeId: FILE_EXT_TYPES[0].id,
      inputValue: '',
    }
  },
  computed: {
    placeholder() {
      return this.isFile ? 'file name' : 'folder name'
    },
    leftFiles() {
      return FILE_EXT_TYPES.filter((e, i) => !(i % 2))
    },
    rightFiles() {
      return FILE_EXT_TYPES.filter((e, i) => i % 2)
    },
    hasValue() {
      return !this.inputValue
    },
  },
  methods: {
    handlePreview() {},
    handleRemove() {},
    createNew() {
      this.$emit('create', {
        name: this.inputValue,
        ...(this.isFile ? { extTypeId: this.extTypeId } : {}),
      })
    },
  },
}
</script>

<style scoped lang="scss">
.dialog-container {
  display: flex;
  justify-content: space-between;
}

.create-new {
  position: relative;
  width: 100%;
}

.title {
  line-height: 24px;
  font-size: 20px;
  color: #303133;
  margin-bottom: 30px;
}

.el-radio-group {
  display: block;
}

.file-or-folder {
  margin-bottom: 10px;
}

.el-radio-button /deep/ .el-radio-button__inner {
  margin-bottom: 10px;
  width: 100px;
}

.select-file {
  margin-bottom: 10px;
  display: flex;
}

.files {
  margin-right: 15px;
}

.el-radio {
  margin: 0px 20px 15px 0px;
  display: block;
}

.inputbox {
  display: flex;
  position: absolute;
  bottom: 0;
}

.border {
  border: solid 0.6px #dadada;
  margin: 25px 40px 10px;
}

.upload-new {
  width: 100%;
}

.upload-demo /deep/ .el-upload-dragger {
  width: 135%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
