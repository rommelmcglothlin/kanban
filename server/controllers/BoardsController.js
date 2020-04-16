import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { boardsService } from "../services/BoardsService";
import { listsService } from "../services/ListsService";
import { tasksService } from "../services/TasksService";
import { commentsService } from "../services/CommentsService";
export class BoardsController extends BaseController {
  constructor() {
    super("api/boards");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.getAllBoards)
      .get("/:boardId", this.getBoard)
      .get("/:boardId/lists", this.getListsByBoardId)
      .get("/:boardId/tasks", this.getTasksByBoardId)
      .get("/:boardId/comments", this.getCommentsByBoardId)
      .post("", this.create)
      .put("/:boardId", this.update)
      .delete("/:boardId", this.delete);
  }

  async getAllBoards(req, res, next) {
    try {
      let boards = await boardsService.findAllBoards({
        creatorEmail: req.userInfo.email,
      });
      return res.send(boards);
    } catch (error) {
      next(error);
    }
  }

  async getBoard(req, res, next) {
    try {
      let board = await boardsService.findBoard({
        _id: req.params.boardId,
        creatorEmail: req.userInfo.email,
      });
      res.send(board);
    } catch (error) {
      next(error);
    }
  }

  async getTasksByBoardId(req, res, next) {
    try {
      let tasks = await tasksService.tasksByBoardId(req.params.boardId);
      res.send(tasks);
    } catch (error) {
      next(error);
    }
  }
  async getCommentsByBoardId(req, res, next) {
    try {
      let comments = await commentsService.commentsByBoardId(
        req.params.boardId
      );
      res.send(comments);
    } catch (error) {
      next(error);
    }
  }
  async getListsByBoardId(req, res, next) {
    try {
      let lists = await listsService.listByBoardId(req.params.boardId);
      res.send(lists);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let board = await boardsService.create(req.body);
      res.send(board);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      let board = await boardsService.delete(req.params.boardId);
      res.send(board);
    } catch (error) {
      next(error);
    }
  }
  //REVIEW Boards may or may not need to be updated (Created the option as a posibility)
  async update(req, res, next) {
    try {
      let board = await boardsService.update(req.params.boardId, req.body);
      res.send(board);
    } catch (error) {
      next(error);
    }
  }
}
