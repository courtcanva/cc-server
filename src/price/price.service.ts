import { Injectable, NotFoundException } from "@nestjs/common";
import { Model, ObjectId } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Price } from "./schemas/price.schema";
import { PaginationQueryDto } from "src/utils/PaginationDto/pagination-query.dto";
import { PriceDto } from "./dto/price.dto";
@Injectable()
export class PriceService {
  constructor(@InjectModel(Price.name) private readonly priceModel: Model<Price>) {}
  async findAll(paginationQuery: PaginationQueryDto): Promise<Price[]> {
    const { limit, offset } = paginationQuery;
    return (await this.priceModel.find().skip(offset).limit(limit).exec()).filter(
      (price) => !price.isDeleted,
    );
  }

  async update(id: ObjectId, priceDto: PriceDto): Promise<Price> {
    const updatePriceDto = {
      ...priceDto,
      tilePrices: priceDto.tilePrices,
      cementFloorPrice: priceDto.cementFloorPrice,
    };
    const existingPrice = await this.priceModel
      .findOneAndUpdate({ _id: id }, { $set: updatePriceDto }, { new: true })
      .exec();
    return existingPrice;
  }
}
