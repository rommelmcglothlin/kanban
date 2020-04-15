<template>
  <div class="task" draggable="true" @dragstart.capture="moving" @dragend="dragEnd">
    <div class="pt-2 card text-light bg-dark mb-3">
      <div class="card-header">
        <span>
          <i class="fa fa-arrows-alt grab"></i>
        </span>
        <h5>{{task.name}}</h5>
        <span>
          <i class="fa fa-trash text-danger mr-2" @click="deleteTask(task)"></i>
        </span>
      </div>
      <div class="card-body">
        <p class="card-text">{{task.description}}</p>
        <comments v-for="comment in comments" :key="comment.id" :commentData="comment" />
        <div>
          <div @click="showComments = !showComments">
            <span class="pr-2">
              <i :class="showComments ?  'fa fa-angle-down' : 'fa fa-angle-right'"></i>
            </span>
            <span class="font-bold">Comments</span>
          </div>
        </div>
        <div v-if="showComments">
          <form class="align-items-center" @submit.prevent="createComment">
            <div>
              <label for="note"></label>
              <input
                class="form-control"
                type="text"
                id="note"
                placeholder="comment note"
                v-model="editable.note"
              />
            </div>
            <div>
              <button class="btn btn-primary ml-2 mt-2">Add Comment</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Task } from "../models/Task";
import { Comment } from "../models/Comment";
import Comments from "../components/Comment";
export default {
  name: "Task",
  components: {
    Comments
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editable: new Comment(),
      showComments: false,
      isMoving: true
    };
  },
  computed: {
    comments() {
      return this.$store.getters.comments[this.task.id];
    }
  },
  mounted() {
    this.$store.dispatch("getComments", this.task.id);
  },
  methods: {
    async createComment() {
      this.$store.dispatch("createComment", {
        note: this.editable.note,
        // listId: this.list.id,
        taskId: this.task.id
        // boardId: this.$route.params.boardId
      });
    },
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
    },
    async deleteTask(task) {
      let yes = await this.$confirm("Delete the Task?");
      if (!yes) {
        return;
      } else {
        this.$store.dispatch("deleteTask", this.task);
      }
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