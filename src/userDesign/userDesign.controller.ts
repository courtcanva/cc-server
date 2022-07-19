import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { UserDesignService } from "./userDesign.service";
import { UserDesign } from "./schemas/userDesign.schema";
import { UserDesignDto } from "./dto/userDesign.dto";

@Controller("userDesign")
export class UserDesignController {
  constructor(private readonly userDesignService: UserDesignService) {}
  @Get(":user_id")
  async findAll(@Param("user_id") user_id: string): Promise<UserDesign[]> {
    return await this.userDesignService.findAll(user_id);
  }

  @Get(":design_id")
  async findOne(
    @Param("design_id") design_id: { user_id: string; design_name: string },
  ): Promise<UserDesign> {
    return await this.userDesignService.findOne(design_id);
  }

  @Post()
  async create(@Body() createUserDesignDto: UserDesignDto): Promise<UserDesign> {
    return await this.userDesignService.create(createUserDesignDto);
  }

  @Put(":design_id")
  async update(
    @Param("design_id") design_id: { user_id: string; design_name: string },
    @Body() UserDesignDto: UserDesignDto,
  ): Promise<UserDesign> {
    const updateUserDesign = {
      ...UserDesignDto,
      design_id: UserDesignDto.design_id,
      tileColor: UserDesignDto.tileColor,
      courtSize: UserDesignDto.courtSize,
    };
    return await this.userDesignService.update(design_id, updateUserDesign);
  }

  @Delete(":design_id")
  async remove(
    @Param("design_id") design_id: { user_id: string; design_name: string },
  ): Promise<boolean> {
    return await this.userDesignService.remove(design_id);
  }
}
