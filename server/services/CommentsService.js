import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class CommentsService {
  async getComments(creatorEmail) {
    let comments = await dbContext.Comments.find(creatorEmail);
    if (!comments) {
      throw new BadRequest("Invalid data");
    }
    return comments;
  }

  async commentsByBoardId(boardId) {
    let comments = await dbContext.Comments.find({ boardId: boardId });
    if (!comments) {
      throw new BadRequest("Invalid ID");
    }
    return comments;
  }

  async getByTaskId(taskId) {
    let comments = await dbContext.Comments.find({ taskId: taskId });
    if (!comments) {
      throw new BadRequest("Invalid ID");
    }
    return comments;
  }

  async getComment(creatorEmail, _id) {
    let comment = await dbContext.Comments.findOne({
      _id,
      creatorEmail,
    });
    if (!comment) {
      throw new BadRequest("Invalid data");
    }
    return comment;
  }
  async create(commentData) {
    let comment = await dbContext.Comments.create(commentData);
    if (!comment) {
      throw new BadRequest("Invalid email");
    }
    return comment;
  }

  async delete(_id) {
    let deleteComment = await dbContext.Comments.findByIdAndRemove(_id);
    if (!deleteComment) {
      throw new BadRequest("Invalid data");
    }
    return deleteComment;
  }

  async update(commentId, newData) {
    return (
      await dbContext.Comments.findByIdAndUpdate(commentId, newData),
      {
        new: true,
      }
    );
  }
}

export const commentsService = new CommentsService();
