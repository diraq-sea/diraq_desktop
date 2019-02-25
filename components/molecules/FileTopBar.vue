<template>
  <div>
    <div :class="focusedClass" class="filename">
      <i class="fas fa-pen" />
      <input
        spellcheck="false"
        type="text"
        :value="filename"
        @change="$emit('changeFilename', $event.target.value)"
        @focus="focused = true"
        @blur="focused = false"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filename: {
      type: String,
      required: true,
    },
  },
  computed: {
    focusedClass() {
      return { focused: this.focused }
    },
  },
  data() {
    return {
      focused: false,
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/admin.scss';

.filename {
  display: inline-block;
  margin-left: 28px;
  border-bottom: 1px solid #ccc;
  position: relative;
  margin-top: 18px;
  padding-bottom: 3px;
  font-size: 20px;

  &::after {
    background-color: $COLOR_ACCENT;
    bottom: -1px;
    content: '';
    height: 2px;
    left: 45%;
    position: absolute;
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    visibility: hidden;
    width: 10px;
  }

  &.focused::after {
    left: 0;
    visibility: visible;
    width: 100%;
  }

  & > input {
    font-size: 18px;
    border: none;
    background-color: transparent;
    padding-right: 30px;
    padding-left: 4px;
    color: $FONT_WHITE;
    position: relative;

    &:focus {
      outline: none;
    }
  }

  & > i {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: #aaa;
    transition: 0.2s;
    font-size: 16px;
  }

  &.focused > i {
    color: $COLOR_ACCENT;
  }
}
</style>
