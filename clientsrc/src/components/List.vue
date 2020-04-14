<template>
  <div>
    <div class="card text-center bg-light mb-3" style="width: 18rem;">
      <div class="card-header justify-content-between">
        {{list.title}}
        <i class="fa fa-trash text-danger mr-2" @click="deleteList"></i>
      </div>
      <div class="card-body" droppable="true" @drop.capture="addTask" @dragover.prevent>
        <div>
          <div @click="showInput = !showInput">
            <span>
              <i :class="showInput ?  'fa fa-angle-down' : 'fa fa-angle-right'"></i>
            </span>
            <span class="font-bold">Add Task</span>
          </div>
        </div>
        <div v-if="showInput">
          <form class="align-items-center" @submit.prevent="createTask">
            <div>
              <label for="title"></label>
              <input
                class="form-control"
                type="text"
                id="name"
                placeholder="Task name"
                v-model="editable.name"
              />
              <label for="description"></label>
              <input
                class="form-control"
                type="text"
                id="description"
                placeholder="Task Description"
                v-model="editable.description"
              />
            </div>
            <div>
              <button class="btn btn-primary ml-2 mt-2">Add Task</button>
            </div>
          </form>
        </div>
        <div>
          <tasks v-for="task in tasks" :key="task.id" :task="task" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from "../models/List";
import { Board } from "../models/Board";
import { Task } from "../models/Task";
import Tasks from "../components/Task";

export default {
  name: "Lists",
  components: {
    Tasks
  },
  props: {
    list: { type: Object, required: true }
  },
  data() {
    return {
      editable: new Task(),
      showInput: false
    };
  },

  computed: {
    tasks() {
      return this.$store.getters.tasks[this.list.id];
    }
  },
  mounted() {
    this.$store.dispatch("getAllTasks", this.list.id);
  },
  methods: {
    createTask() {
      this.$store.dispatch("createTask", {
        name: this.editable.name,
        description: this.editable.description,
        listId: this.list.id,
        boardId: this.$route.params.boardId
      });
      this.editable = new Task();
    },
    addTask() {
      // get the item off of the event storage
      let item = JSON.parse(event.dataTransfer.getData("data"));
      // get the starting location off of the event storage
      let from = event.dataTransfer.getData("from");
      // don't allow drops in the same room
      if (from == this.list.id) {
        return;
      }
      this.$store.dispatch("moveTask", { task, to: this.list.id });
    },
    async deleteList() {
      let yes = await this.$confirm("Delete the List?");
      if (!yes) {
        return;
      } else {
        this.$store.dispatch("deleteList", this.list);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  max-width: 100vw;
  overflow-x: auto;
}
.card {
  min-height: 80vh;
  width: 300px;
  background-color: var(--info);
}
</style>
