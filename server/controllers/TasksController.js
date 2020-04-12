import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { tasksService } from "../services/TasksService";
import { commentsService } from "../services/CommentsService";

export class TasksController extends BaseController {
  constructor() {
    super("api/");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("lists/:listId/tasks", this.getTasksByListId)
      .get("boards/:boardId/tasks", this.getTasksByBoardId)
      .get("tasks/:taskId", this.getSingleTask)
      .post("tasks/", this.create)
      .put("tasks/:taskId", this.update)
      .delete("tasks/:taskId", this.delete);
  }

  async getTasksByListId(req, res, next) {
    try {
      let tasks = await tasksService.getTasks(
        req.userInfo.email,
        req.params.listId
      );
      res.send(tasks);
    } catch (error) {
      next(error);
    }
  }

  async getTasksByBoardId(req, res, next) {
    try {
      let tasks = await tasksService.tasksByBoardId(
        req.userInfo.email,
        req.params.boardId
      );
      res.send(tasks);
    } catch (error) {
      next(error);
    }
  }
  async getSingleTask(req, res, next) {
    try {
      let task = await tasksService.getTask(
        req.userInfo.email,
        req.params.taskId
      );
      res.send(task);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let task = await tasksService.create(req.body);
      res.send(task);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let task = await tasksService.delete(
        req.userInfo.email,
        req.params.taskId
      );
      res.send(task);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      let task = await tasksService.update(req.params.taskId, req.body);
      res.send(task);
    } catch (e) {
      next(e);
    }
  }
}
