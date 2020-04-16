import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BoardsService {
  async findAllBoards(creatorEmail) {
    let boards = await dbContext.Boards.find(creatorEmail);
    if (!boards) {
      throw new BadRequest("Invalid email");
    }
    return boards;
  }
  async findBoard(_id, creatorEmail) {
    let board = await dbContext.Boards.findById(_id, creatorEmail);
    if (!board) {
      throw new BadRequest("Invalid Id");
    }
    return board;
  }
  async create(boardData) {
    let board = await dbContext.Boards.create(boardData);
    if (!board) {
      throw new BadRequest("Invalid email");
    }
    return board;
  }

  async delete(_id) {
    let board = await dbContext.Boards.findByIdAndDelete(_id);
    if (!_id) {
      throw new BadRequest("Invalid ID");
    }
    return board._id;
  }
  //REVIEW Boards may or may not need to be updated (Created the option as a posibility)
  async update(boardId, newData) {
    return await dbContext.Boards.findByIdAndUpdate(boardId, newData, {
      new: true,
    });
  }
}
export const boardsService = new BoardsService();
