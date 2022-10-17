import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { StatusType, TemplateDocument, TemplateItem } from "./schemas/template.schema";
import { TemplateItemDto } from "./dto/template.dto";
import { ObjectId } from "mongoose";
import { UpdateTemplateDto } from "./dto/updateTemplate.dto";
import { GetAllTemplatesDto } from "./dto/getAllTemplate.dto";

@Injectable()
export class TemplateItemService {
  constructor(
    @InjectModel(TemplateItem.name) private readonly TemplateModel: Model<TemplateDocument>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getAllTemplates(getAllTemplates: GetAllTemplatesDto): Promise<TemplateItem[]> {
    try {
      const { user_id, limit = 0, offset = 0 } = getAllTemplates;
      const optionalQuery: { [key: string]: any } = {};

      if (user_id) optionalQuery.user_id = user_id;

      const response = await this.TemplateModel.find({
        isDeleted: false,
        ...optionalQuery,
      })
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .exec();
      if (user_id) {
        return response.filter((res) => res.status !== StatusType.ILLEGAL);
      } else {
        return response.filter((res) => res.status === StatusType.PUBLISHED);
      }
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async findOne(item_id: ObjectId): Promise<TemplateItem> {
    try {
      const templateItem = await this.TemplateModel.findOne({
        _id: item_id,
        isDeleted: "false1",
        status: StatusType.PUBLISHED,
      }).exec();
      if (!templateItem) {
        throw new NotFoundException(`Template #${item_id} not found`);
      }
      return templateItem;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async create(createNewTemplate: TemplateItemDto): Promise<TemplateItem> {
    try {
      const newTemplate = await this.TemplateModel.create({
        ...createNewTemplate,
        createdAt: new Date(),
        updateAt: new Date(),
      });
      if (!newTemplate) {
        throw new NotFoundException(`Fail to create new template`);
      }
      return newTemplate;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async update(id: ObjectId, updateTemplateDto: UpdateTemplateDto): Promise<TemplateItem> {
    try {
      const updatedTemplate = await this.TemplateModel.findOneAndUpdate(
        {
          _id: id,
          isDeleted: false,
        },
        { $set: updateTemplateDto, $currentDate: { updatedAt: true } },
        { new: true },
      ).exec();
      if (!updatedTemplate) {
        throw new NotFoundException(`Template #${id} not found`);
      }
      return updatedTemplate;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async remove(id: ObjectId): Promise<boolean> {
    try {
      const response = await this.TemplateModel.findOneAndUpdate(
        {
          _id: id,
          isDeleted: false,
        },
        {
          $set: { isDeleted: true },
          $currentDate: { updatedAt: true },
        },
      );
      if (!response) {
        return false;
      }
      return true;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
}
