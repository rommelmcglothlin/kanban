import { Comment } from "../models/Comment";
import { $resource } from "./resource";

export default {
  state: {
    comments: [],
    comment: new Comment(),
  },
  mutations: {
    setComments(state, comments = []) {
      state.comments = comments;
    },
    setComment(state, comment = new Comment()) {
      state.comment = comment;
    },
    addComment(state, comment) {
      state.comments.push(new Comment(comment));
    },
    deleteComment(state, comment) {
      let i = state.comments.findIndex((c) => c.id == comment.id);
      if (i != -1) {
        state.comments.splice(i, 1);
      }
    },
  },
  actions: {
    async getComments({ commit }) {
      let comments = await $resource.get("api/taskId/comments");
      commit("setComments", comments);
    },
    async getComment({ commit }, id) {
      let comments = await $resource.get("api/comments/" + id);
      commit("setComment", comments);
    },
    async createComment({ commit }, commentData) {
      let comment = await $resource.post("api/comments/", commentData);
      commit("setComment", comment);
      commit("addComment", comment);
    },
    async deleteComment({ commit }, comment) {
      await $resource.delete("api/comments/" + comment.id);
      commit("deleteComment", comment);
    },
  },
};
