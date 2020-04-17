<template>
  <div class="comments">
    <ul class="list-group text-dark list-group-flush">
      <li class="list-group-item">
        <span>
          <i class="fa fa-trash text-danger mt-n4" @click="deleteComment(comment)"></i>
        </span>
        {{comment.note}}
      </li>
    </ul>
  </div>
</template>
<script>
import { Comment } from "../models/Comment";
export default {
  name: "Comments",
  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  methods: {
    async deleteComment(comment) {
      let yes = await this.$confirm("Delete comment?");
      if (!yes) {
        return;
      } else {
      }
      this.$store.dispatch("deleteComment", this.comment);
    }
  }
};
</script>
<style>
</style>