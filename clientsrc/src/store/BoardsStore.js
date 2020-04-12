import { Board } from "../models/Board";
import { $resource } from "./resource";

export default {
  state: {
    boards: [],
    board: new Board(),
  },
  mutations: {
    /* set a defaults boards = [] */
    setBoards(state, boards = []) {
      state.boards = boards;
    },
    setBoard(state, board = new Board()) {
      state.board = board;
    },
    addBoard(state, board) {
      state.boards.push(new Board(board));
    },
    deleteBoard(state, board) {
      console.log("deleting from the store id:", board.id);
      let i = state.boards.findIndex((b) => b.id == board.id);
      if (i != -1) {
        state.boards.splice(i, 1);
      }
    },
    updateBoard(state, board) {
      console.log("updating from the store id:", board.id);
      let i = state.boards.findIndex((b) => b.id == board.id);
      if (i != -1) {
        state.boards.splice(i, 1, board);
      }
    },
  },
  actions: {
    async getBoards({ commit }) {
      let boards = await $resource.get("api/boards");
      commit("setBoards", boards);
    },
    async getBoard({ commit }, id) {
      let boards = await $resource.get("api/boards/" + id);
      /* sets the board as active board */
      commit("setBoard", boards);
    },
    async createBoard({ commit }, boardData) {
      let board = await $resource.post("api/boards", boardData);
      // REVIEW when creating a board this sets it as the active board
      commit("setBoard", board);
      // this does add the board to the list
      commit("addBoard", board);
    },
    async deleteBoard({ commit }, boardData) {
      let board = await $resource.delete("api/boards/" + boardData.id);
      /* sets the board as active board */
      commit("deleteBoard", board);
    },
    async updateBoard({ commit }, boardData) {
      let board = await $resource.put("api/boards/", boardData);
      /* sets the board as active board */
      commit("updateBoard", board);
    },
  },
};
