<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
          <div class="board">
            <h1>{{board.name}}</h1>
            <h2>{{board.description}}</h2>
          </div>
        </div>
        <div class="col-6 m-auto align-item-right">
          <form class="form-inline" @submit.prevent="createList">
            <div class="form-group mx-sm-3 mb-2">
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="Sprint Status"
                v-model="editable.title"
              />
            </div>
            <button type="submit" class="btn btn-primary mb-2">Create</button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-12 boxes d-flex align-items-top scrollmenu">
          <lists class="pl-5" v-for="list in lists" :key="list.id" :list="list" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { List } from "../models/List";
import Lists from "../components/List";
export default {
  name: "Board",
  components: {
    Lists
  },
  mounted() {
    this.$store.dispatch("getBoard", this.$route.params.boardId);
    this.$store.dispatch("getAllLists", this.$route.params.boardId);
    this.$store.dispatch("getAllTasks", this.$route.params.boardId);
  },
  computed: {
    board() {
      return this.$store.state.boardsStore.board;
    },
    lists() {
      return this.$store.state.listsStore.lists;
    }
  },
  data() {
    return {
      editable: new List()
    };
  },
  methods: {
    createList() {
      this.$store.dispatch("createList", {
        title: this.editable.title,
        boardId: this.$route.params.boardId
      });
      this.editable = new List();
    }
  }
};
</script>

<style>
.scrollmenu {
  overflow-x: scroll;
}
</style>