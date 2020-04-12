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
      <div>
        <lists v-for="list in lists" :key="list.id" :listProp="list" />
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
      this.$store.dispatch("createList", this.editable);
      this.editablle = new List();
    }
  }
};
</script>

<style>
</style>