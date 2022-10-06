import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { TemplateDocument, TemplateItem } from "./schemas/template.schema";

@Injectable()
export class TemplateItemService {
  constructor(
    @InjectModel(TemplateItem.name) private readonly TemplateModel: Model<TemplateDocument>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // funcs here
  //   getAll() {
  //     return;
  //   }

  //   getAllUserTemplate() {
  //     return;
  //   }

  //   findOne() {
  //     return;
  //   }

  //   createTemplate() {
  //     return;
  //   }

  //   removeTemplateByUser() {
  //     return;
  //   }

  //   undateTemplateByAdmin() {
  //     return;
  //   }

  //   deleteTemplate() {
  //     return;
  //   }
}
