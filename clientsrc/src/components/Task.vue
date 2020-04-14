<template>
  <div class="task" draggable="true" @dragstart.capture="moving" @dragend="dragEnd">
    <div class="pt-2 card text-light bg-dark mb-3">
      <div class="card-header">
        <span>
          <i class="fa fa-arrows-alt grab"></i>
        </span>
        <h5>{{task.name}}</h5>
        <span>
          <i class="fa fa-trash text-danger mr-2" @click="deleteTask"></i>
        </span>
      </div>
      <div class="card-body">
        <p class="card-text">{{task.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Task } from "../models/Task";
export default {
  name: "Task",
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      task: new Task(),
      isMoving: true
    };
  },
  computed: {},
  methods: {
    moving(event) {
      let from = this.listId;
      event.dataTransfer.setData("data", JSON.stringify(this.taskData));
      event.dataTransfer.setData("from", from);
      console.log("moving");
    },
    dragEnd() {
      console.log("the item is no longer being dragged");
    },
    dragging() {
      console.log("we are dragging the item", this.itemData);
    }
  },
  async deleteTask() {
    let yes = await this.$confirm("Delete the Task?");
    if (!yes) {
      return;
    } else {
      this.$store.dispatch("deleteTask", this.task);
    }
  }
};
</script>

<style>
.grab {
  cursor: -webkit-grab;
  cursor: grab;
}
</style>