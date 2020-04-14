import { List } from "../models/List";
import { $resource } from "./resource";
import { toastSuccess } from "@bcwdev/quickvue";

export default {
  state: {
    lists: [],
    list: new List(),
  },
  mutations: {
    setLists(state, lists = []) {
      state.lists = lists;
    },
    setList(state, list = new List()) {
      state.list = list;
    },
    addList(state, list) {
      state.lists.push(new List(list));
    },
    deleteList(state, list) {
      let i = state.lists.findIndex((l) => l.id == list.id);
      if (i != -1) {
        state.lists.splice(i, 1);
      }
    },
  },
  actions: {
    async getAllLists({ commit }, boardId) {
      let lists = await $resource.get("api/boards/" + boardId + "/lists");
      commit("setLists", lists);
    },
    async getList({ commit }, id) {
      let lists = await $resource.get("api/lists/" + id);
      commit("setList", lists);
    },
    async createList({ commit }, listData) {
      let list = await $resource.post("api/lists/", listData);
      commit("setList", list);
      commit("addList", list);
      toastSuccess("Story Added!");
    },
    async deleteList({ commit }, list) {
      await $resource.delete("api/lists/" + list.id);
      commit("deleteList", list);
    },
  },
};
