import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { TemplateDocument, TemplateItem } from "./schemas/template.schema";

@Injectable()
export class TemplateItemService {
  constructor(
    @InjectModel(TemplateItem.name) private readonly cartItemModel: Model<TemplateDocument>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // funcs here
}
