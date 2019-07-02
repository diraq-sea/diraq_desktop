<template>
  <div class="dialog-container">
    <div class="create-new">
      <p class="title">Create new</p>
      <el-radio-group v-model="isFile" class="file-or-folder">
        <el-radio-button class="new new-file" :label="true">file</el-radio-button>
        <el-radio-button :label="false" class="new new-folder">folder</el-radio-button>
      </el-radio-group>
      <transition name="fade">
        <el-radio-group v-if="isFile" v-model="extTypeId" class="radio2">
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
        <el-input v-model="inputValue" :placeholder="placeholder" class="input-with-select">
          <el-button slot="append" :disabled="hasValue" native-type="submit"> Create </el-button>
        </el-input>
      </form>
    </div>
    <div class="border"></div>
    <div class="upload-new">
      <p class="title">Upload new file</p>
      <el-upload
        class="upload-demo"
        action=""
        :accept="accept"
        drag
        :show-file-list="false"
        :on-change="onChange"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        <div class="el-upload__tip">files with a size less than 512mb</div>
      </el-upload>
    </div>

    <div v-show="dragging" class="drop-area">
      <div class="drop-frame"><i class="el-icon-upload" /></div>
      <div
        class="drop-panel"
        @drop.prevent="onDrop"
        @dragover.prevent
        @dragleave="onDragleave"
        @click="onDragleave"
      />
    </div>
  </div>
</template>

<script>
import FILE_EXT_TYPES from '~~/common/fileExtTypes'
import getEntryList from '../utils/getEntryList.js'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isFile: true,
      extTypeId: FILE_EXT_TYPES[0].id,
      inputValue: '',
      dragging: false,
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
    accept: () => FILE_EXT_TYPES.map(type => `.${type.extname}`).join(','),
  },
  watch: {
    visible(val) {
      if (val) {
        document.addEventListener('dragenter', this.onDragenter, false)
      } else {
        document.removeEventListener('dragenter', this.onDragenter, false)
      }
    },
  },
  mounted() {
    document.addEventListener('dragenter', this.onDragenter, false)
  },
  destroyed() {
    document.removeEventListener('dragenter', this.onDragenter, false)
  },
  methods: {
    createNew() {
      this.$emit('create', {
        name: this.inputValue,
        ...(this.isFile ? { extTypeId: this.extTypeId } : {}),
      })
    },
    onDragenter() {
      this.dragging = true
    },
    onDragleave() {
      this.dragging = false
    },
    async onDrop(e) {
      this.onDragleave()
      const data = e.dataTransfer
      const entrys = data.items
      const endPath = ''

      const absoluteFliePath = data.files[0].path.slice(0, data.files[0].path.lastIndexOf('/'))
      const entryList = await getEntryList(entrys, endPath, absoluteFliePath)
      this.$emit('drop', entryList)
    },
    onChange(e) {
      if (e.status === 'success') {
        this.$emit('drop', e.raw)
      }
    },
  },
}
</script>

<style scoped>
.dialog-container {
  display: flex;
  justify-content: start;
}

.create-new {
  position: relative;
  width: 250px;
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

.el-radio-button >>> .el-radio-button__inner {
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
  margin: 0 20px 15px 0;
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
  width: 250px;
}

.upload-demo >>> .el-upload-dragger {
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

.drop-area {
  position: fixed;
  top: var(--titlebar-height);
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
}

.drop-area .drop-frame {
  position: absolute;
  top: var(--drop-padding);
  left: var(--drop-padding);
  right: var(--drop-padding);
  bottom: var(--drop-padding);
  border: 5px dashed var(--drop-color);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--drop-color);
}

.drop-area .drop-frame i {
  font-size: 100px;
}

.drop-area .drop-panel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
