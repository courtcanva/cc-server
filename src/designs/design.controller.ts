import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from "@nestjs/common";
import { DesignService } from "./design.service";
import { Design } from "./schemas/design.schema";
import { DesignDto } from "./dto/design.dto";
import { ObjectId } from "mongoose";
import { upLoadImgTo3S } from "src/utils/UploadImg";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("designs")
export class DesignController {
  constructor(private readonly designService: DesignService) {}

  @Get(":id")
  @UseGuards(AuthGuard)
  async find(@Param("id") user_id: string): Promise<Design[]> {
    return await this.designService.find(user_id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createDesignDto: DesignDto): Promise<Design> {
    const createDesign = { ...createDesignDto, image: await upLoadImgTo3S(createDesignDto.image) };
    return await this.designService.create(createDesign);
  }

  @Put(":_id")
  @UseGuards(AuthGuard)
  async update(@Param("_id") _id: ObjectId, @Body() designDto: DesignDto): Promise<Design> {
    const updateDesign = {
      ...designDto,
      image: await upLoadImgTo3S(designDto.image),
    };
    return await this.designService.update(_id, updateDesign);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  async remove(@Param("id") id: ObjectId): Promise<boolean> {
    return await this.designService.remove(id);
  }
}
