import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Price } from "./schemas/price.schema";
import { CreatePriceDto } from "./dto/create-price.dto";
import { UpdatePriceDto } from "./dto/update-price.dto";

@Injectable()
export class PriceService {
  constructor(@InjectModel(Price.name) private readonly priceModel: Model<Price>) {}
  async findAll(): Promise<Price[]> {
    return (await this.priceModel.find().exec()).filter((price) => price.isDeleted !== true);
  }

  async findOne(id: string): Promise<Price> {
    try {
      const price = await this.priceModel.findOne({ tile_id: id }).exec();
      return price;
    } catch {
      throw new NotFoundException({
        message: "Price cannot be find, please search again",
      });
    }
  }

  async create(createPriceDto: CreatePriceDto): Promise<Price> {
    const tile = await this.priceModel.create(createPriceDto);
    return tile;
  }

  async update(id: string, updatePriceDto: UpdatePriceDto): Promise<Price> {
    try {
      const existingPrice = await this.priceModel
        .findOneAndUpdate(
          { tile_id: id },
          { $set: updatePriceDto, $currentDate: { updatedAt: true } },
          { new: true },
        )
        .exec();
      return existingPrice;
    } catch {
      throw new NotFoundException({
        message: "Price cannot be found, please search again",
      });
    }
  }

  async remove(id: string, updatePriceDto: UpdatePriceDto): Promise<boolean> {
    try {
      await this.priceModel.findOneAndUpdate(
        { tile_id: id },
        { $set: { isDeleted: true }, $currentDate: { updatedAt: true } },
      );
      return true;
    } catch {
      return false;
    }
  }
}
