import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { TemplateDocument, TemplateItem } from "./schemas/template.schema";
import { TemplateItemDto } from "./dto/template.dto";
import { ObjectId } from "mongoose";

@Injectable()
export class TemplateItemService {
  constructor(
    @InjectModel(TemplateItem.name) private readonly TemplateModel: Model<TemplateDocument>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<TemplateItem[]> {
    return await this.TemplateModel.find({});
  }

  async getTemplateById(item_id: ObjectId): Promise<TemplateItem> {
    return await this.TemplateModel.findById(item_id);
  }

  async getTemplatesByUserId(user_id: string): Promise<TemplateItem[]> {
    try {
      return (await this.TemplateModel.find({ user_id: user_id }).exec()).filter(
        (template) => template.isDeleted != true,
      );
    } catch {
      throw new NotFoundException({
        message: " User template cannot be find ,please search again",
      });
    }
  }

  async create(createNewTemplate: TemplateItemDto): Promise<TemplateItem> {
    const newTemplate = await this.TemplateModel.create(createNewTemplate);
    return newTemplate;
  }

  //   removeTemplateByUser() {
  //     return;
  //   }
  // NOTE: 是否添加update 的功能，update 的信息目前只有下架

  //   updateTemplateByAdmin() {
  //     return;
  //   }

  async remove(id: ObjectId): Promise<boolean> {
    try {
      await this.TemplateModel.findOneAndUpdate(
        { _id: id },
        { $set: { isDeleted: true }, $currentDate: { updatedAt: true } },
      );
      return true;
    } catch {
      return false;
    }
  }
}
