import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { StatusType, TemplateDocument, TemplateItem } from "./schemas/template.schema";
import { TemplateItemDto } from "./dto/template.dto";
import { ObjectId } from "mongoose";
import { UpdateTemplateDto } from "./dto/updateTemplate.dto";
import { GetAllTemplatesDto } from "./dto/getAllTemplate.dto";
import { PaginationQueryDto } from "src/utils/PaginationDto/pagination-query.dto";

@Injectable()
export class TemplateItemService {
  constructor(
    @InjectModel(TemplateItem.name) private readonly TemplateModel: Model<TemplateDocument>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getAllTemplates(
    getAllTemplates: PaginationQueryDto & GetAllTemplatesDto,
  ): Promise<{ data: TemplateItem[]; total: number }> {
    const { user_id, limit = 0, offset = 0 } = getAllTemplates;
    const optionalQuery: { [key: string]: any } = {};

    if (user_id) optionalQuery.user_id = user_id;

    const templates = await this.TemplateModel.find({
      isDeleted: false,
      ...optionalQuery,
    })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();

    const total = await this.TemplateModel.countDocuments({
      isDeleted: false,
    });

    const totalPunished = await this.TemplateModel.countDocuments({
      isDeleted: false,
      status: "published",
    });

    const totalIllegal = await this.TemplateModel.countDocuments({
      isDeleted: false,
      status: "illegal",
    });

    const totalNonIllegal = total - totalIllegal;
    console.log(typeof totalNonIllegal);
    if (user_id) {
      return {
        data: templates.filter((res) => res.status !== StatusType.ILLEGAL),
        total: totalNonIllegal,
      };
    } else {
      return {
        data: templates.filter((res) => res.status === StatusType.PUBLISHED),
        total: totalPunished,
      };
    }
  }

  async findOne(item_id: ObjectId): Promise<TemplateItem> {
    const templateItem = await this.TemplateModel.findOne({
      _id: item_id,
      isDeleted: false,
      status: StatusType.PUBLISHED,
    }).exec();
    if (!templateItem) {
      throw new NotFoundException(`Template #${item_id} not found`);
    }
    return templateItem;
  }

  async create(createNewTemplate: TemplateItemDto): Promise<TemplateItem> {
    const newTemplate = await this.TemplateModel.create(createNewTemplate);
    if (!newTemplate) {
      throw new NotFoundException(`Fail to create new template`);
    }
    return newTemplate;
  }

  async update(id: ObjectId, updateTemplateDto: UpdateTemplateDto): Promise<TemplateItem> {
    const updatedTemplate = await this.TemplateModel.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      { $set: updateTemplateDto },
      { new: true },
    ).exec();
    if (!updatedTemplate) {
      throw new NotFoundException(`Template #${id} not found`);
    }
    return updatedTemplate;
  }

  async remove(id: ObjectId): Promise<boolean> {
    const response = await this.TemplateModel.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      {
        $set: { isDeleted: true },
      },
    );
    if (!response) {
      return false;
    }
    return true;
  }
}
