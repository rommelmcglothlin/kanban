<template>
  <div class="board-card">
    <div class="card-deck">
      <div class="card">
        <img class="card-img-top" src="/images/kanban.jpg" height="300" alt="Card image cap" />
        <div class="card-body">
          <h3 class="card-title">
            <router-link :to="{ name: 'Board', params: { boardId: board.id } }">{{ board.name}}</router-link>
          </h3>
          <p class="card-text">{{board.description}}</p>
          <span>
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
  </div>
</template>

<script>
export default {
  name: "BoardCard",
  props: {
    board: { type: Object, required: true }
  },
  methods: {
    async deleteBoard(board) {
      let yes = await this.$confirm("Delete this board?");
      if (!yes) {
        return;
      }
      this.$store.dispatch("deleteBoard", board);
    }
  }
};
</script>

<style>
</style>
