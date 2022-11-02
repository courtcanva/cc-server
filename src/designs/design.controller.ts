import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { DesignService } from "./design.service";
import { Design } from "./schemas/design.schema";
import { DesignDto } from "./dto/design.dto";
import { ObjectId } from "mongoose";

@Controller("designs")
export class DesignController {
  constructor(private readonly designService: DesignService) {}

  @Get(":id")
  async find(@Param("id") user_id: string): Promise<Design[]> {
    return await this.designService.find(user_id);
  }

  @Post()
  async create(@Body() createDesignDto: DesignDto): Promise<Design> {
    return await this.designService.create(createDesignDto);
  }

  @Put(":_id")
  async update(@Param("_id") _id: ObjectId, @Body() designDto: DesignDto): Promise<Design> {
    const updateDesign = {
      ...designDto,
      designName: designDto.designName,
      tileColor: designDto.tileColor,
      courtSize: designDto.courtSize,
    };
    return await this.designService.update(_id, updateDesign);
  }

  @Delete(":id")
  async remove(@Param("id") id: ObjectId): Promise<boolean> {
    return await this.designService.remove(id);
  }
}
