import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";
import { commentsService } from "../services/CommentsService";

export class CommentsController extends BaseController {
  constructor() {
    super("api/comments");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.getAllComments)
      .get("/:commentId", this.getSingleComment)
      .delete("/:commentId", this.delete)
      .post("", this.create)
      .put("/:commentId", this.update);
  }

  async getAllComments(req, res, next) {
    try {
      let comments = await commentsService.getComments({
        creatorEmail: req.userInfo.email,
      });
      res.send(comments);
    } catch (error) {
      next(error);
    }
  }
  async getSingleComment(req, res, next) {
    try {
      let comment = await commentsService.getComment({
        creatorEmail: req.userInfo.email,
        _id: req.params.commentId,
      });
      res.send(comment);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let comment = await commentsService.create(req.body);
      res.send(comment);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let comment = await commentsService.delete({
        _id: req.params.commentId,
      });
      res.send(comment);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      let comment = await commentsService.update(
        req.params.commentId,
        req.body
      );
      res.send(comment);
    } catch (e) {
      next(e);
    }
  }
}
