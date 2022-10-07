import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { TemplateItemService } from "./templateItem.service";
import { TemplateItem } from "./schemas/template.schema";
import { ObjectId } from "mongoose";
import { TemplateItemDto } from "./dto/template.dto";

@Controller("templates")
export class TemplateItemController {
  constructor(private readonly templateItemsService: TemplateItemService) {}

  @Get(" ")
  async getAllTemplates(): Promise<TemplateItem[]> {
    return await this.templateItemsService.findAll();
  }

  @Get(":Id")
  async find(@Param("id") user_id: string): Promise<TemplateItem[]> {
    return await this.templateItemsService.find(user_id);
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
