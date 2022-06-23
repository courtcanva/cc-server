import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Tile } from "./schemas/tile.schema";
import { CreateTileDto } from "./dto/create-tile.dto";
import { UpdateTileDto } from "./dto/update-tile.dto";

@Injectable()
export class TilesService {
  constructor(@InjectModel(Tile.name) private readonly tileModel: Model<Tile>) {}
  async findAll(): Promise<Tile[]> {
    return await (await this.tileModel.find().exec()).filter((tile) => tile.isDeleted !== true);
  }

  async findOne(id: string): Promise<Tile> {
    try {
      const tile = await this.tileModel.findOne({ _id: id }).exec();
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

  async update(id: string, updateTileDto: UpdateTileDto): Promise<Tile> {
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
        message: "Tile cannot be find, please search again",
      });
    }
  }

  async remove(id: string, updateTileDto: UpdateTileDto): Promise<string> {
    try {
      await this.tileModel.findOneAndUpdate(
        { _id: id },
        { $set: { isDeleted: true }, $currentDate: { updatedAt: true } },
      );
      return "Tile deleted successfully";
    } catch {
      throw new NotFoundException({
        message: "Tile cannot be find, please try again",
      });
    }
  }
}
