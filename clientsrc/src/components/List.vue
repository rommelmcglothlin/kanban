<template>
  <div>
    <div class="card text-center bg-light mb-3" style="width: 18rem;">
      <div class="card-header justify-content-between">
        {{list.title}}
        <i class="fa fa-trash text-danger mr-2" @click="deleteList"></i>
      </div>
      <div
        class="card-body"
        droppable="true"
        @dragenter="dragEnter"
        @dragleave="dragLeave"
        @drop.capture="addTask"
        @dragover.prevent
        ref="droppable"
      >
        <div>
          <div @click="showInput = !showInput">
            <span class="font-bold">Add Task</span>
            <span class="pl-2">
              <i :class="showInput ?  'fa fa-minus' : 'fa fa-plus'"></i>
            </span>
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
              <button class="pb-2 btn btn-primary ml-2 mt-2">Add Task</button>
            </div>
          </form>
        </div>
        <div class="overflow-scroll-gradient">
          <div class="overflow-scroll-gradient-scroller">
            <tasks v-for="task in tasks" :key="task.id" :task="task" />
          </div>
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
    // this.$store.dispatch("getAllTasks", this.list.id);
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
      this.$refs.droppable.classList.remove("droppable");
      let item = JSON.parse(event.dataTransfer.getData("data"));
      let from = event.dataTransfer.getData("from");
      if (from == this.list.id) {
        return;
      }
      this.$store.dispatch("moveTask", { task, to: this.list.id });
    },
    dragEnter() {
      this.$refs.droppable.classList.add("droppable");
    },
    dragLeave() {
      this.$refs.droppable.classList.remove("droppable");
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
.overflow-scroll-gradient {
  position: relative;
}

.overflow-scroll-gradient::after {
  content: "";
  position: absolute;
  bottom: 0;
  //width: 250px;
  height: 30px;
  background: linear-gradient(transparent);
  pointer-events: none;
}

.overflow-scroll-gradient-scroller {
  overflow-y: scroll;
  //background: white;
  //width: 240px;
  height: 50vh;
  padding: 15px;
  line-height: 1.2;
}
</style>
