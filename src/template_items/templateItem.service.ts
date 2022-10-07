import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { TemplateDocument, TemplateItem } from "./schemas/template.schema";
import { TemplateItemDto } from "./dto/template.dto";
import { ObjectId } from "mongoose";
import { UpdateTemplateDto } from "./dto/updatedTemplate.dto";
import { getAllTemplatesDto } from "./dto/getAllTemplate.dto";

@Injectable()
export class TemplateItemService {
  constructor(
    @InjectModel(TemplateItem.name) private readonly TemplateModel: Model<TemplateDocument>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(getAllTemplates: getAllTemplatesDto): Promise<TemplateItem[]> {
    const { user_id, limit = 0, offset = 0 } = getAllTemplates;
    const optionalQuery: { [key: string]: any } = {};
    if (user_id) optionalQuery.user_id = user_id;
    try {
      return await this.TemplateModel.find({ isDeleted: false, ...optionalQuery })
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .exec();
    } catch {
      throw new NotFoundException("user_id cannot be empty string");
    }
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
        message: " User template cannot be found ,please search again",
      });
    }
  }

  async create(createNewTemplate: TemplateItemDto): Promise<TemplateItem> {
    const newTemplate = await this.TemplateModel.create(createNewTemplate);
    return newTemplate;
  }

  async update(id: ObjectId, updateTemplateDto: UpdateTemplateDto): Promise<TemplateItem> {
    try {
      return await this.TemplateModel.findByIdAndUpdate(
        { _id: id },
        { $set: updateTemplateDto, $currentDate: { updatedAt: true } },
        { new: true },
      ).exec();
    } catch {
      throw new NotFoundException({
        message: " Template cannot be found,please search again",
      });
    }
  }

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
