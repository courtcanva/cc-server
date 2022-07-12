import { Injectable, NotFoundException } from "@nestjs/common";
import { Model, ObjectId } from "mongoose";
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

  async findOne(id: ObjectId): Promise<Price> {
    try {
      const price = await this.priceModel.findOne({ _id: id }).exec();
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

  async update(id: ObjectId, updatePriceDto: UpdatePriceDto): Promise<Price> {
    try {
      const existingPrice = await this.priceModel
        .findOneAndUpdate(
          { _id: id },
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

  async remove(id: ObjectId, updatePriceDto: UpdatePriceDto): Promise<boolean> {
    try {
      await this.priceModel.findOneAndUpdate(
        { _id: id },
        { $set: { isDeleted: true }, $currentDate: { updatedAt: true } },
      );
      return true;
    } catch {
      return false;
    }
  }
}
