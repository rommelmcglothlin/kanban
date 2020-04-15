import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class TasksService {
  async findAll(creatorEmail) {
    let tasks = await dbContext.Tasks.find(creatorEmail);
    if (!creatorEmail) {
      throw new BadRequest("Invalid email");
    }
    return tasks;
  }
  async getTasks(listId) {
    let tasks = await dbContext.Tasks.find({ listId });
    if (!listId) {
      throw new BadRequest("Invalid data");
    }
    return tasks;
  }

  async getTask(creatorEmail, _id) {
    let task = await dbContext.Tasks.findOne({
      _id,
      creatorEmail,
    });
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

  async update(taskId, newData) {
    return (
      await dbContext.Tasks.findByIdAndUpdate(taskId, newData),
      {
        new: true,
      }
    );
  }
}

export const tasksService = new TasksService();
