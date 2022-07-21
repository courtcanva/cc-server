import { Controller, Get, Post, Body, Param, Put, Delete, Query } from "@nestjs/common";
import { PriceService } from "./price.service";
import { Price } from "./schemas/price.schema";
import { CreatePriceDto } from "./dto/create-price.dto";
import { UpdatePriceDto } from "./dto/update-price.dto";
import { ObjectId } from "mongoose";
import { PaginationQueryDto } from "../utils/PaginationDto/pagination-query.dto";

@Controller("price")
export class PriceController {
  constructor(private readonly priceService: PriceService) {}
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Price[]> {
    const { limit, offset } = paginationQuery;
    return await this.priceService.findAll(paginationQuery);
  }

  @Get(":id")
  async findOne(@Param("id") id: ObjectId): Promise<Price> {
    return await this.priceService.findOne(id);
  }

  @Post()
  async create(@Body() createPriceDto: CreatePriceDto): Promise<Price> {
    return await this.priceService.create(createPriceDto);
  }

  @Put(":id")
  async update(@Param("id") id: ObjectId, @Body() updatePriceTo: UpdatePriceDto): Promise<Price> {
    return await this.priceService.update(id, updatePriceTo);
  }

  @Delete(":id")
  async remove(@Param("id") id: ObjectId, @Body() updatePriceTo: UpdatePriceDto): Promise<boolean> {
    return await this.priceService.remove(id, updatePriceTo);
  }
}
