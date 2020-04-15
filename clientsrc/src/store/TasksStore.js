import { Task } from "../models/Task";
import { $resource } from "./resource";
import { toastSuccess } from "@bcwdev/quickvue";

export default {
  state: {
    tasks: [],
    task: new Task(),
  },
  mutations: {
    setTasks(state, tasks = []) {
      state.tasks = tasks;
    },
    // setTask(state, task = new Task()) {
    //   state.task = task;
    // },
    addTask(state, task) {
      state.tasks.push(new Task(task));
    },
    updateTask(state, task) {
      let index = state.tasks.findIndex((t) => t.id == task.id);
      state.tasks.splice(index, 1, task);
    },
    deleteTask(state, task) {
      let i = state.tasks.findIndex((t) => t.id == task.id);
      if (i != -1) {
        state.tasks.splice(i, 1);
      }
    },
  },
  actions: {
    async getAllTasks({ commit }, listId) {
      let tasks = await $resource.get("api/lists/" + listId + "/tasks");
      commit("setTasks", tasks);
    },
    async moveTask({ commit }, { task, to }) {
      task.listId = to;
      let movedTask = await $resource.put("api/tasks/", task);
      commit("updateTask", movedTask);
    },

    // async getTask({ commit }, id) {
    //   let tasks = await $resource.get("api/tasks/" + id);
    //   commit("setTask", tasks);
    // },
    async createTask({ commit }, taskData) {
      let task = await $resource.post("api/tasks/", taskData);
      commit("addTask", task);
      toastSuccess("Task Added");
    },

    async deleteTask({ commit }, task) {
      await $resource.delete("api/tasks/" + task.id);
      commit("deleteTask", task);
    },
  },
  getters: {
    tasks(state) {
      let taskGetter = {};
      state.tasks.forEach((t) => {
        if (!taskGetter[t.listId]) {
          taskGetter[t.listId] = [];
        }
        taskGetter[t.listId].push(t);
      });
      return taskGetter;
    },
  },
};
