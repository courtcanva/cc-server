import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { UserDesignService } from "./userDesign.service";
import { UserDesign } from "./schemas/userDesign.schema";
import { UserDesignDto } from "./dto/userDesign.dto";
import { ObjectId } from "mongoose";

@Controller("userDesign")
export class UserDesignController {
  constructor(private readonly userDesignService: UserDesignService) {}
  @Get(":user_id")
  async findAll(@Param("user_id") user_id: string): Promise<UserDesign[]> {
    return await this.userDesignService.findAll(user_id);
  }

  @Get(":id")
  async findOne(@Param("id") id: ObjectId): Promise<UserDesign> {
    return await this.userDesignService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDesignDto: UserDesignDto): Promise<UserDesign> {
    return await this.userDesignService.create(createUserDesignDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: ObjectId,
    @Body() UserDesignDto: UserDesignDto,
  ): Promise<UserDesign> {
    const updateUserDesign = {
      ...UserDesignDto,
      designName: UserDesignDto.designName,
      tileColor: UserDesignDto.tileColor,
      courtSize: UserDesignDto.courtSize,
    };
    return await this.userDesignService.update(id, updateUserDesign);
  }

  @Delete(":id")
  async remove(@Param("id") id: ObjectId): Promise<boolean> {
    return await this.userDesignService.remove(id);
  }
}
