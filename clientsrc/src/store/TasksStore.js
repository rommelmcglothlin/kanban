import { Task } from "../models/Task";
import { $resource } from "./resource";

export default {
  state: {
    tasks: [],
    task: new Task(),
  },
  mutations: {
    setTasks(state, tasks = []) {
      state.tasks = tasks;
    },
    setTask(state, task = new Task()) {
      state.task = task;
    },
    addTask(state, task) {
      state.tasks.push(new Task(task));
    },
    deleteTask(state, task) {
      let i = state.tasks.findIndex((t) => t.id == task.id);
      if (i != -1) {
        state.tasks.splice(i, 1);
      }
    },
  },
  actions: {
    async getTasks({ commit }) {
      let tasks = await $resource.get("api/listId/tasks");
      commit("setTasks", tasks);
    },
    async getTask({ commit }, id) {
      let tasks = await $resource.get("api/tasks/" + id);
      commit("setTask", tasks);
    },
    async createTask({ commit }, taskData) {
      let task = await $resource.post("api/tasks/", taskData);
      commit("setTask", task);
      commit("addTask", task);
    },
    async deleteTask({ commit }, task) {
      await $resource.delete("api/tasks/" + task.id);
      commit("deleteTask", task);
    },
  },
};
