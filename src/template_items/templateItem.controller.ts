import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { TemplateItemService } from "./templateItem.service";
import { TemplateItem } from "./schemas/template.schema";
import { ObjectId } from "mongoose";
import { TemplateItemDto } from "./dto/template.dto";

@Controller("templates")
export class TemplateItemController {
  constructor(private readonly templateItemsService: TemplateItemService) {}

  @Get()
  async getAllTemplates(): Promise<TemplateItem[]> {
    return await this.templateItemsService.findAll();
  }

  @Get(":Id")
  async getTemplateById(@Param("id") item_id: ObjectId): Promise<TemplateItem> {
    return await this.templateItemsService.getTemplateById(item_id);
  }

  // 这个可以考虑改一下，改成万能查询，利用query，还可以吧findAll给合并进来
  @Get()
  async getTemplatesByUserId(@Query() user_id: string): Promise<TemplateItem[]> {
    return await this.templateItemsService.getTemplatesByUserId(user_id);
  }

  @Post()
  async create(@Body() createTemplateDto: TemplateItemDto): Promise<TemplateItem> {
    return await this.templateItemsService.create(createTemplateDto);
  }

  //   @Put(":id")
  //   removeTemplateByUser() {
  //     return;
  //   }

  //   @Put(":id")
  //   undateTemplateByAdmin() {
  //     return;
  //   }

  @Delete(":id")
  async remove(@Param("id") id: ObjectId): Promise<boolean> {
    return await this.templateItemsService.remove(id);
  }
}
