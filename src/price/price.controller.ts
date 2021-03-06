import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { PriceService } from "./price.service";
import { Price } from "./schemas/price.schema";
import { PriceDto } from "./dto/price.dto";

@Controller("price")
export class PriceController {
  constructor(private readonly priceService: PriceService) {}
  @Get()
  async findAll(): Promise<Price[]> {
    return await this.priceService.findAll();
  }

  @Get(":tile_id")
  async findOne(@Param("tile_id") tile_id: string): Promise<Price> {
    return await this.priceService.findOne(tile_id);
  }

  @Post()
  async create(@Body() createPriceDto: PriceDto): Promise<Price> {
    return await this.priceService.create(createPriceDto);
  }

  @Put(":tile_id")
  async update(@Param("tile_id") tile_id: string, @Body() priceDto: PriceDto): Promise<Price> {
    const updatePriceDto = {
      ...priceDto,
      deliveryPrice: priceDto.deliveryPrice,
      tilePrice: priceDto.tilePrice,
    };
    return await this.priceService.update(tile_id, updatePriceDto);
  }

  @Delete(":tile_id")
  async remove(@Param("tile_id") tile_id: string): Promise<boolean> {
    return await this.priceService.remove(tile_id);
  }
}
