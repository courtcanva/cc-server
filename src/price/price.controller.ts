import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { PriceService } from "./price.service";
import { Price } from "./schemas/price.schema";
import { CreatePriceDto } from "./dto/create-price.dto";
import { UpdatePriceDto } from "./dto/update-price.dto";
import { ObjectId } from "mongoose";

@Controller("prices")
export class PriceController {
  constructor(private readonly priceService: PriceService) {}
  @Get()
  async findAll(): Promise<Price[]> {
    return await this.priceService.findAll();
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
