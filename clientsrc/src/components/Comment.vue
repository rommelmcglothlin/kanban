
<template>
  <div class="comments">
    <ul class="list-group text-light list-group-flush">
      <li class="list-group-item">
        {{comment.note}}
        <!-- <span>
          <i
            v-if="$auth.isAuthenticated && $auth.user.email == commentProp.creatorEmail"
            class="fa fa-trash text-danger mt-n4 float-right pointer"
            style="font-size:18px;"
            @click="deleteComment(comment)"
          ></i>
        </span>-->
      </li>
    </ul>
  </div>
</template>
<script>
import { Comment } from "../models/Comment";
export default {
  name: "Comments",
  props: {
    commentData: {
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