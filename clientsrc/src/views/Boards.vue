<template>
  <div>
    <form @submit.prevent="createBoard">
      <div class="mb-3">
        <label for="name">Name:</label>
        <input class="form-control" type="text" v-model="editable.name" />
      </div>
      <div class="mb-3">
        <label for="name">Description:</label>
        <input class="form-control" type="text" v-model="editable.description" />
      </div>
      <div class="my-3">
        <button class="btn btn btn-success btn-block">Create Board</button>
      </div>
    </form>
    <div class="boards">
      <div class="card p-2 my-2 elevation-4" v-for="board in boards" :key="board.id">
        <span>
          <router-link :to="{name: 'Board', params: {boardId: board.id}}">{{board.name}}</router-link>
          <i
            v-if="$auth.isAuthenticated && $auth.user.email == board.creatorEmail"
            class="fa fa-trash text-danger mr-2 ml-3"
            style="font-size:18px;"
            @click="deleteBoard(board)"
          ></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { Board } from "../models/Board";
export default {
  name: "Boards",
  components: {},
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    boards() {
      return this.$store.state.boardsStore.boards;
    }
  },
  data() {
    return {
      editable: new Board()
    };
  },
  methods: {
    createBoard() {
      this.$store.dispatch("createBoard", this.editable);
      this.editable = new Board();
    },
    async deleteBoard(board) {
      let yes = await this.$confirm("Delete the board?");
      if (!yes) {
        return;
      } else {
      }
      this.$store.dispatch("deleteBoard", board);
    }
  }
};
</script>
<style>
</style>