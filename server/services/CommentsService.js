import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class CommentsService {
  async getComments(creatorEmail, task) {
    //TODO: add a check for email later
    let comments = await dbContext.Comments.find({
      creatorEmail,
      task,
    });
    if (!comments) {
      throw new BadRequest("Invalid data");
    }
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
    let comment = await dbContext.Comments.find(commentData);
    if (!comment) {
      throw new BadRequest("Invalid email");
    }
    return comment;
  }

  async delete(creatorEmail, _id) {
    let deleteComment = await dbContext.Comments.findByIdAndRemove({
      creatorEmail,
      _id,
    });
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
