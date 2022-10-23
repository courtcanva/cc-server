import { Injectable, NotFoundException } from "@nestjs/common";
import { Model, ObjectId } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Design } from "./schemas/design.schema";
import { DesignDto } from "./dto/design.dto";

@Injectable()
export class DesignService {
  constructor(@InjectModel(Design.name) private readonly designModel: Model<Design>) {}

  async find(user_id: string): Promise<Design[]> {
    return (await this.designModel.find({ user_id: user_id }).exec()).filter(
      (design) => !design.isDeleted,
    );
  }

  async create(createDesign: DesignDto): Promise<Design> {
    const design = await this.designModel.create(createDesign);
    return design;
  }

  async update(_id: ObjectId, designDto: DesignDto): Promise<Design> {
    const updateDesign = {
      ...designDto,
      designName: designDto.designName,
      tileColor: designDto.tileColor,
      courtSize: designDto.courtSize,
    };
    const existingDesign = await this.designModel
      .findOneAndUpdate({ _id: _id }, { $set: updateDesign }, { new: true })
      .exec();
    return existingDesign;
  }

  async remove(id: ObjectId): Promise<boolean> {
    const response = await this.designModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: { isDeleted: true } },
    );
    if (!response) return false;
    return true;
  }
}
