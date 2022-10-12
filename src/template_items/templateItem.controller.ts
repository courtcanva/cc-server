import { Body, Controller, Delete, Get, Param, Post, Query, Put } from "@nestjs/common";
import { TemplateItemService } from "./templateItem.service";
import { TemplateItem } from "./schemas/template.schema";
import { ObjectId } from "mongoose";
import { TemplateItemDto } from "./dto/template.dto";
import { GetAllTemplatesDto } from "./dto/getAllTemplate.dto";
import { UpdateTemplateDto } from "./dto/updateTemplate.dto";
// import { SearchTemplateDto } from "./dto/searchTemplate.dto";

@Controller("templates")
export class TemplateItemController {
  constructor(private readonly templateItemsService: TemplateItemService) {}

  @Get()
  async getAllTemplates(@Query() getAllTemplates: GetAllTemplatesDto): Promise<TemplateItem[]> {
    return await this.templateItemsService.getAllTemplates(getAllTemplates);
  }

  // 考虑到后续的search功能，这个得删掉和seatch合并
  // 同一个路径不能有两个get方法
  // 还有一种方法就是给每个装饰器多加一层路径
  // 需要讨论
  @Get(":Id")
  async getTemplateById(@Param("id") item_id: ObjectId): Promise<TemplateItem> {
    return await this.templateItemsService.getTemplateById(item_id);
  }

  // 待讨论
  // @Get()
  // async searchTemplates(@Query() searchTemplateDto: SearchTemplateDto): Promise<TemplateItem[]> {
  //   return await this.templateItemsService.searchTemplate(searchTemplateDto);
  // }

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
