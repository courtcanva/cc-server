import { Injectable, NotFoundException } from "@nestjs/common";
import { Model, ObjectId } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Design } from "./schemas/design.schema";
import { DesignDto } from "./dto/design.dto";

@Injectable()
export class DesignService {
  constructor(@InjectModel(Design.name) private readonly designModel: Model<Design>) {}

  async find(user_id: string): Promise<Design[]> {
    try {
      return (await this.designModel.find({ user_id: user_id }).exec()).filter(
        (design) => !design.isDeleted,
      );
    } catch {
      throw new NotFoundException({
        message: "User design cannot be find, please search again",
      });
    }
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
    try {
      const existingDesign = await this.designModel
        .findOneAndUpdate(
          { _id: _id },
          { $set: updateDesign, $currentDate: { updatedAt: true } },
          { new: true },
        )
        .exec();
      return existingDesign;
    } catch {
      throw new NotFoundException({
        message: "User design cannot be found, please search again",
      });
    }
  }

  async remove(id: ObjectId): Promise<boolean> {
    try {
      await this.designModel.findOneAndUpdate(
        { _id: id },
        { $set: { isDeleted: true }, $currentDate: { updatedAt: true } },
      );
      return true;
    } catch {
      return false;
    }
  }
}
