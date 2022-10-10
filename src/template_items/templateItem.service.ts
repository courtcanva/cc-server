import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { StatusType, TemplateDocument, TemplateItem } from "./schemas/template.schema";
import { TemplateItemDto } from "./dto/template.dto";
import { ObjectId } from "mongoose";
import { UpdateTemplateDto } from "./dto/updateTemplate.dto";
import { GetAllTemplatesDto } from "./dto/getAllTemplate.dto";
import { SearchTemplateDto } from "./dto/searchTemplate.dto";

@Injectable()
export class TemplateItemService {
  constructor(
    @InjectModel(TemplateItem.name) private readonly TemplateModel: Model<TemplateDocument>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // get all the templates in database
  // 这个只是找到一个user自己全部的template。还需要一个搜索的，比如我需要找到所有full court的template
  async findAll(getAllTemplates: GetAllTemplatesDto): Promise<TemplateItem[]> {
    try {
      const { user_id, limit = 0, offset = 0 } = getAllTemplates;
      const optionalQuery: { [key: string]: any } = {};
      if (user_id) optionalQuery.user_id = user_id;
      return await this.TemplateModel.find({
        isDeleted: false,
        status: StatusType.PUBLISHED,
        ...optionalQuery,
      })
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .exec();
    } catch (err) {
      throw new NotFoundException({
        message: "Something went wrong, pls try again",
      });
    }
  }

  // 需要修改，可改成万能搜索
  // FIXME: 已经修改，看是否需要删掉这个
  // 别删，我想看看和上面复杂的有啥区别
  // async findAll_(user_id: string): Promise<TemplateItem[]> {
  //   try {
  //     return (
  //       await this.TemplateModel.find({ user_id: user_id }).sort({ createdAt: -1 }).exec()
  //     ).filter((template) => template.isDeleted != true);
  //   } catch {
  //     throw new NotFoundException({
  //       message: " User template cannot be found ,please search again",
  //     });
  //   }
  // }

  // get template by template id
  async getTemplateById(item_id: ObjectId): Promise<TemplateItem> {
    const templateItem = await this.TemplateModel.findById(item_id).exec();
    if (!templateItem) {
      throw new NotFoundException(`Template #${item_id} not found`);
    }
    return templateItem;
  }

  async create(createNewTemplate: TemplateItemDto): Promise<TemplateItem> {
    const newTemplate = await this.TemplateModel.create({
      ...createNewTemplate,
      createdAt: new Date(),
      updateAt: new Date(),
    });

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
        message: "Template cannot be found, please search again",
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

  async searchTemplate(searchTemplateDto: SearchTemplateDto): Promise<TemplateItem[]> {
    try {
      const { limit = 0, offset = 0 } = searchTemplateDto;
      return await this.TemplateModel.find(searchTemplateDto)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .exec();
    } catch {
      throw new NotFoundException({
        message: "Nothing was found, please try to search something else!",
      });
    }
  }
}
