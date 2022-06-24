import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { TilesService } from "./tiles.service";
import { Tile } from "./schemas/tile.schema";
import { CreateTileDto } from "./dto/create-tile.dto";
import { UpdateTileDto } from "./dto/update-tile.dto";

@Controller("tiles")
export class TilesController {
  constructor(private readonly tilesService: TilesService) {}
  @Get()
  async findAll(): Promise<Tile[]> {
    return await this.tilesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Tile> {
    return await this.tilesService.findOne(id);
  }

  @Post()
  async create(@Body() createTileDto: CreateTileDto): Promise<Tile> {
    return await this.tilesService.create(createTileDto);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateTileTo: UpdateTileDto): Promise<Tile> {
    return await this.tilesService.update(id, updateTileTo);
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Body() updateTileTo: UpdateTileDto): Promise<boolean> {
    return await this.tilesService.remove(id, updateTileTo);
  }
}
