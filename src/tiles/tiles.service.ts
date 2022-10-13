import { Injectable } from "@nestjs/common";
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
      (tile) => !tile.isDeleted,
    );
  }

  async findOne(id: ObjectId): Promise<Tile> {
    const tile = await this.tileModel.findOne({ _id: id }).populate("price").exec();
    return tile;
  }

  async create(createTileDto: CreateTileDto): Promise<Tile> {
    const tile = await this.tileModel.create(createTileDto);
    return tile;
  }

  async update(id: ObjectId, updateTileDto: UpdateTileDto): Promise<Tile> {
    const existingTile = await this.tileModel
      .findOneAndUpdate({ _id: id }, { $set: updateTileDto }, { new: true })
      .exec();
    return existingTile;
  }

  async remove(id: ObjectId, updateTileDto: UpdateTileDto): Promise<boolean> {
    const response = await this.tileModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: { isDeleted: true } },
    );
    if (!response) return false;
    return true;
  }
}
