<template>
  <div>
    <div class="boxes d-flex align-items-top">
      <div class="box d-flex justify-content-between">
        {{list.title}}
        <i class="fa fa-trash text-muted mr-2" @click="deleteList"></i>
        <i class="fa fa-pencil text-muted mr-2" @click="editList"></i>
      </div>
    </div>
  </div>
</template>

<script>
import List from "../models/List";
export default {
  name: "Lists",
  props: {
    list: { type: Object, required: true }
  },
  computed: {},
  methods: {
    async deleteList() {
      let yes = await this.$confirm(
        "Are you sure you want to delete the List?"
      );
      if (!yes) {
        return;
      } else {
        this.$store.dispatch("deleteList", this.list);
      }
    },
    async editList() {
      this.$emit("edit", this.list);
    }
  }
};
</script>

<style scoped lang="scss">
.boxes {
  max-width: 100vw;
  overflow-x: auto;
}
.box {
  min-height: 80vh;
  width: 250px;
  background-color: var(--info);
}
</style>
