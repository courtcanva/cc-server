import { Controller, Get, Post, Body, Param, Put, Delete, Query } from "@nestjs/common";
import { PriceService } from "./price.service";
import { Price } from "./schemas/price.schema";
import { ObjectId } from "mongoose";
import { PaginationQueryDto } from "../utils/PaginationDto/pagination-query.dto";
import { PriceDto } from "./dto/price.dto";

@Controller("price")
export class PriceController {
  constructor(private readonly priceService: PriceService) {}
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Price[]> {
    const { limit, offset } = paginationQuery;
    return await this.priceService.findAll(paginationQuery);
  }

  @Put(":_id")
  async update(@Param("_id") _id: ObjectId, @Body() priceDto: PriceDto): Promise<Price> {
    return await this.priceService.update(_id, priceDto);
  }
}
