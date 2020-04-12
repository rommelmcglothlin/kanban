<template>
  <div class="modal-continer">
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
      :class="{show:open}"
      :style="{display: open? 'block' : 'none'}"
    >
      <div class="modal-dialog modal-dialog-centered" role="document" v-if="open">
        <div class="modal-content">
          <div class="modal-header" v-if="showHeader">
            <h5 class="modal-title">
              <slot name="title"></slot>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer" v-if="showFoot">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="close"
            >Close</button>
            <button type="button" class="btn btn-primary" @click="save">Save</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-backdrop fade" :class="open ? 'show' : ''"></div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: {
    open: { type: Boolean, default: false, required: true },
    showFoot: { type: Boolean, default: false },
    showHeader: { type: Boolean, default: false }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      this.$emit("save");
    },
    captureKey() {
      if (event.keyCode == 27) {
        this.close();
      }
    }
  },
  mounted() {
    document.addEventListener("keydown", this.captureKey);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.captureKey);
  }
};
</script>

<style scoped lang="scss">
.modal-backdrop:not(.show) {
  pointer-events: none;
}
</style>