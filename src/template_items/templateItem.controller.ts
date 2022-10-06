import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { TemplateItemService } from "./templateItem.service";

@Controller("template-items")
export class TemplateItemController {
  constructor(private readonly templateItemsService: TemplateItemService) {}

  //   @Get()
  //   getAll() {
  //     return;
  //   }

  //   @Get(":userId")
  //   getAllUserTemplate() {
  //     return;
  //   }

  //   @Get(":id")
  //   findOne() {
  //     return;
  //   }

  //   @Post()
  //   createTemplate() {
  //     return;
  //   }

  //   @Put(":id")
  //   removeTemplateByUser() {
  //     return;
  //   }

  //   @Put(":id")
  //   undateTemplateByAdmin() {
  //     return;
  //   }

  //   @Delete(":id")
  //   deleteTemplate() {
  //     return;
  //   }
}
