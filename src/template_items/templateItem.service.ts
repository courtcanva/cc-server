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

  // 考虑到user可以查看自己template的状态（下架，违法，上架，审核中）这个逻辑还有问题
  // 我修改了下
  // 当userId存在的时候，说明是user想找自己的template，所以除了违法的都返回给他
  // 当userId不存在的时候，说明是社区页面需要获取服务器里所有的templates，所以返回所有上架的templates
  // 但是直接返回所有doc，肯定offset和limit有问题，需要结合以后的需求讨论
  // 待讨论
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

      if (user_id && response) {
        return response.filter((res) => res.status !== StatusType.ILLEGAL);
      } else {
        return response.filter((res) => res.status === StatusType.PUBLISHED);
      }
    } catch (err) {
      throw new NotFoundException({
        message: "Something went wrong, pls try again",
      });
    }
  }

  // 下面这坨我删了，我懂Derek的良苦用心了

  // 待修改
  // get template by template id
  async getTemplateById(item_id: ObjectId): Promise<TemplateItem> {
    const templateItem = await this.TemplateModel.findOne({
      _id: item_id,
      isDeleted: false,
    }).exec();
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
      return await this.TemplateModel.findOneAndUpdate(
        {
          _id: id,
          isDeleted: false,
        },
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
        {
          _id: id,
          isDeleted: false,
        },
        {
          $set: { isDeleted: true },
          $currentDate: { updatedAt: true },
        },
      );
      return true;
    } catch {
      return false;
    }
  }

  // 待修改
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
