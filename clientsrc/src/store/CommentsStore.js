import { Comment } from "../models/Comment";
import { $resource } from "./resource";
import { toastSuccess } from "@bcwdev/quickvue";

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
    async getAllComments({ commit }, boardId) {
      let comments = await $resource.get("api/boards/" + boardId + "/comments");
      commit("setComments", comments);
    },
    async getComment({ commit }, id) {
      let comments = await $resource.get("api/comments/" + id);
      commit("setComment", comments);
    },
    async createComment({ commit }, commentData) {
      let comment = await $resource.post("api/comments/", commentData);
      commit("addComment", comment);
      toastSuccess("Comment Added");
    },
    async deleteComment({ commit }, comment) {
      await $resource.delete("api/comments/" + comment.id);
      commit("deleteComment", comment);
    },
  },
  getters: {
    comments(state) {
      let commentsGetter = {};
      state.comments.forEach((c) => {
        if (!commentsGetter[c.taskId]) {
          commentsGetter[c.taskId] = [];
        }
        commentsGetter[c.taskId].push(c);
      });
      return commentsGetter;
    },
  },
};
