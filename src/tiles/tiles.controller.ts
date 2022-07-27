import { Controller, Get, Post, Body, Param, Put, Delete, Query } from "@nestjs/common";
import { TilesService } from "./tiles.service";
import { Tile } from "./schemas/tile.schema";
import { CreateTileDto } from "./dto/create-tile.dto";
import { UpdateTileDto } from "./dto/update-tile.dto";
import { ObjectId } from "mongoose";
import { PaginationQueryDto } from "../utils/PaginationDto/pagination-query.dto";
@Controller("tiles")
export class TilesController {
  constructor(private readonly tilesService: TilesService) {}
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Tile[]> {
    const { limit, offset } = paginationQuery;
    return await this.tilesService.findAll(paginationQuery);
  }

  @Get(":id")
  async findOne(@Param("id") id: ObjectId): Promise<Tile> {
    return await this.tilesService.findOne(id);
  }

  @Post()
  async create(@Body() createTileDto: CreateTileDto): Promise<Tile> {
    return await this.tilesService.create(createTileDto);
  }

  @Put(":id")
  async update(@Param("id") id: ObjectId, @Body() updateTileTo: UpdateTileDto): Promise<Tile> {
    return await this.tilesService.update(id, updateTileTo);
  }

  @Delete(":id")
  async remove(@Param("id") id: ObjectId, @Body() updateTileTo: UpdateTileDto): Promise<boolean> {
    return await this.tilesService.remove(id, updateTileTo);
  }
}
