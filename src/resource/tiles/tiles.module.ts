import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TilesService } from "./tiles.service";
import { TilesController } from "./tiles.controller";
import { Tile, TileSchema } from "./schemas/tile.schema";
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tile.name,
        schema: TileSchema,
      },
    ]),
  ],
  controllers: [TilesController],
  providers: [TilesService],
})
export class TilesModule {}
