import { Body, Controller, Delete, Get, Param, Post, Query, Put } from "@nestjs/common";
import { TemplateItemService } from "./templateItem.service";
import { TemplateItem } from "./schemas/template.schema";
import { ObjectId } from "mongoose";
import { TemplateItemDto } from "./dto/template.dto";
import { GetAllTemplatesDto } from "./dto/getAllTemplate.dto";
import { UpdateTemplateDto } from "./dto/updateTemplate.dto";

@Controller("templates")
export class TemplateItemController {
  constructor(private readonly templateItemsService: TemplateItemService) {}

  @Get()
  async getAllTemplates(@Query() getAllTemplates: GetAllTemplatesDto): Promise<TemplateItem[]> {
    return await this.templateItemsService.getAllTemplates(getAllTemplates);
  }

  @Get(":id")
  async findOne(@Param("id") item_id: ObjectId): Promise<TemplateItem> {
    return await this.templateItemsService.findOne(item_id);
  }

  @Post()
  async create(@Body() createTemplateDto: TemplateItemDto): Promise<TemplateItem> {
    return await this.templateItemsService.create(createTemplateDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: ObjectId,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ): Promise<TemplateItem> {
    return await this.templateItemsService.update(id, updateTemplateDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: ObjectId): Promise<boolean> {
    return await this.templateItemsService.remove(id);
  }
}
