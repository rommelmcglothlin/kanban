import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { listsService } from "../services/ListsService";
import { tasksService } from "../services/TasksService";

export class ListsController extends BaseController {
  constructor() {
    super("api/lists");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.getAllLists)
      .get("/:listId/tasks", this.getTasksByListId)
      .get("/:listId", this.getList)
      .post("", this.create)
      .put("/:listId", this.update)
      .delete("/:listId", this.delete);
  }

  async getAllLists(req, res, next) {
    try {
      let lists = await listsService.findAllLists({
        creatorEmail: req.userInfo.email,
      });
      res.send(lists);
    } catch (error) {
      next(error);
    }
  }
  async getList(req, res, next) {
    try {
      let list = await listsService.findList({
        creatorEmail: req.userInfo.email,
        _id: req.params.listId,
      });
      res.send(list);
    } catch (error) {
      next(error);
    }
  }

  async getTasksByListId(req, res, next) {
    try {
      let tasks = await tasksService.getTasks({ _id: req.params.listId });
      res.send(tasks);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let list = await listsService.create(req.body);
      res.send(list);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let list = await listsService.delete(req.params.listId);
      res.send(list);
    } catch (error) {
      next(error);
    }
  }

  // REVIEW may not need to use this function at all
  async update(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let list = await listsService.update(req.params.listId, req.body);
      res.send(list);
    } catch (error) {
      next(error);
    }
  }
}
