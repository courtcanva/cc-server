import { Injectable, NotFoundException } from "@nestjs/common";
import { Model, ObjectId } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Tile } from "./schemas/tile.schema";
import { CreateTileDto } from "./dto/create-tile.dto";
import { UpdateTileDto } from "./dto/update-tile.dto";
import { PaginationQueryDto } from "src/utils/PaginationDto/pagination-query.dto";

@Injectable()
export class TilesService {
  constructor(@InjectModel(Tile.name) private readonly tileModel: Model<Tile>) {}
  async findAll(paginationQuery: PaginationQueryDto): Promise<Tile[]> {
    const { limit, offset } = paginationQuery;
    return (await this.tileModel.find().skip(offset).limit(limit).exec()).filter(
      (tile) => tile.isDeleted !== true,
    );
  }

  async findOne(id: ObjectId): Promise<Tile> {
    try {
      const tile = await this.tileModel.findOne({ _id: id }).populate("price").exec();
      return tile;
    } catch {
      throw new NotFoundException({
        message: "Tile cannot be find, please search again",
      });
    }
  }

  async create(createTileDto: CreateTileDto): Promise<Tile> {
    const tile = await this.tileModel.create(createTileDto);
    return tile;
  }

  async update(id: ObjectId, updateTileDto: UpdateTileDto): Promise<Tile> {
    try {
      const existingTile = await this.tileModel
        .findOneAndUpdate(
          { _id: id },
          { $set: updateTileDto, $currentDate: { updatedAt: true } },
          { new: true },
        )
        .exec();
      return existingTile;
    } catch {
      throw new NotFoundException({
        message: "Tile cannot be found, please search again",
      });
    }
  }

  async remove(id: ObjectId, updateTileDto: UpdateTileDto): Promise<boolean> {
    try {
      await this.tileModel.findOneAndUpdate(
        { _id: id },
        { $set: { isDeleted: true }, $currentDate: { updatedAt: true } },
      );
      return true;
    } catch {
      return false;
    }
  }
}
