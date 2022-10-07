import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { StatusType, TemplateDocument, TemplateItem } from "./schemas/template.schema";
import { TemplateItemDto } from "./dto/template.dto";
import { ObjectId } from "mongoose";

@Injectable()
export class TemplateItemService {
  constructor(
    @InjectModel(TemplateItem.name) private readonly TemplateModel: Model<TemplateDocument>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // get all the templates in database
  async findAll(): Promise<TemplateItem[]> {
    try {
      return await this.TemplateModel.find({
        isDeleted: false,
        status: StatusType.PUBLISHED,
      }).exec();
    } catch (err) {
      throw new NotFoundException({
        message: "Something went wrong, pls try again",
      });
    }
  }

  // get template by template id
  async getTemplateById(item_id: ObjectId): Promise<TemplateItem> {
    const templateItem = await this.TemplateModel.findById(item_id).exec();
    if (!templateItem) {
      throw new NotFoundException(`Template #${item_id} not found`);
    }
    return templateItem;
  }

  // 需要修改，可改成万能搜索
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
    const newTemplate = await this.TemplateModel.create({
      ...createNewTemplate,
      createdAt: new Date(),
      updateAt: new Date(),
    });
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
