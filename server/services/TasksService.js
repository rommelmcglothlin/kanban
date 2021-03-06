import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class TasksService {
  async tasksByBoardId(boardId) {
    let tasks = await dbContext.Tasks.find({ boardId: boardId });
    if (!tasks) {
      throw new BadRequest("Invalid ID");
    }
    return tasks;
  }

  async findAll(creatorEmail) {
    let tasks = await dbContext.Tasks.find(creatorEmail);
    if (!tasks) {
      throw new BadRequest("Invalid email");
    }
    return tasks;
  }
  async getTaskByList(listId) {
    let tasks = await dbContext.Tasks.find({ listId });
    if (!tasks) {
      throw new BadRequest("Invalid data");
    }
    return tasks;
  }

  async getTask(taskId) {
    let task = await dbContext.Tasks.findById(taskId);
    if (!task) {
      throw new BadRequest("Invalid data");
    }
    return task;
  }
  async create(taskData) {
    let task = await dbContext.Tasks.create(taskData);
    if (!task) {
      throw new BadRequest("Invalid data");
    }
    return task;
  }

  async delete(_id) {
    let task = await dbContext.Tasks.findByIdAndDelete(_id);
    if (!task) {
      throw new BadRequest("Invalid data");
    }
    return task;
  }

  async update(task) {
    let newTask = await dbContext.Tasks.findByIdAndUpdate(task.id, task, {
      new: true,
    });
    return newTask;
  }
}

export const tasksService = new TasksService();
