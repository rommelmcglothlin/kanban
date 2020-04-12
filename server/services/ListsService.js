import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class ListsService {
  async findAllLists(creatorEmail) {
    let lists = await dbContext.Lists.find(creatorEmail);
    if (!creatorEmail) {
      throw new BadRequest("Invalid email");
    }
    return lists;
  }

  async findList(creatorEmail, _id) {
    let lists = await dbContext.Lists.find({
      creatorEmail,
      _id,
    });
    if (!lists) {
      throw new BadRequest("Invalid data");
    }
    return lists;
  }

  async listByBoardId(boardId) {
    let lists = await dbContext.Lists.find({ boardId: boardId });
    if (!boardId) {
      throw new BadRequest("Invalid ID");
    }
    return lists;
  }

  async create(listData) {
    let newList = await dbContext.Lists.create(listData);
    if (!newList) {
      throw new BadRequest("Please try again");
    }
    return newList;
  }

  async delete(_id) {
    let deleteList = await dbContext.Lists.findByIdAndRemove({
      _id,
    });
    if (!deleteList) {
      throw new BadRequest("Invalid data");
    }
    return deleteList;
  }

  async update(_id, newData) {
    return await dbContext.Lists.findOneAndUpdate(
      {
        _id,
        creatorEmail: newData.creatorEmail,
      },
      newData,
      { new: true, runValidators: true }
    );
  }
}

export const listsService = new ListsService();
