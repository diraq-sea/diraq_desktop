<template>
  <div>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper" @click.self="closeModal()">
          <div class="modal-container">
            <div class="modal-body">
              <slot name="body">
                {{ modalMessage }}
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <button
                  ref="initialfocus"
                  type="button"
                  class="btn btn04 w-auto"
                  tabindex="0"
                  @click="closeModal()"
                  @keydown.esc="closeModal()"
                  @keydown.tab.prevent
                >
                  OK
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  // props: ['modalMessage'],
  props: {
    modalMessage: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    this.$refs.initialfocus.focus()
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
  },
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: var(--titlebar-height);
  left: 0;
  width: 100%;
  height: calc(100% - var(--titlebar-height));
  background-color: rgba(254, 254, 254, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.modal-container {
  display: inline-block;
  width: auto;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
  display: block;
  text-align: center;
}
</style>
