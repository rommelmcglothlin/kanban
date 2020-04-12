import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BoardsService {
  async findAllBoards(creatorEmail) {
    let boards = await dbContext.Boards.find(creatorEmail);
    if (!creatorEmail) {
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
}
export const boardsService = new BoardsService();
