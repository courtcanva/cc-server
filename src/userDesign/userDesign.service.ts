import { Injectable, NotFoundException } from "@nestjs/common";
import { Model, ObjectId } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UserDesign } from "./schemas/userDesign.schema";
import { UserDesignDto } from "./dto/userDesign.dto";

@Injectable()
export class UserDesignService {
  constructor(@InjectModel(UserDesign.name) private readonly userDesignModel: Model<UserDesign>) {}
  async findAll(user_id: string): Promise<UserDesign[]> {
    return (await this.userDesignModel.find({ user_id: user_id }).exec()).filter(
      (userDesign) => userDesign.isDeleted !== true,
    );
  }

  async findOne(id: ObjectId): Promise<UserDesign> {
    try {
      const userDesign = await this.userDesignModel.findOne({ _id: id }).exec();
      return userDesign;
    } catch {
      throw new NotFoundException({
        message: "User design cannot be find, please search again",
      });
    }
  }

  async create(createUserDesign: UserDesignDto): Promise<UserDesign> {
    const userDesign = await this.userDesignModel.create(createUserDesign);
    return userDesign;
  }

  async update(id: ObjectId, UserDesignDto: UserDesignDto): Promise<UserDesign> {
    const updateUserDesign = {
      ...UserDesignDto,
      designName: UserDesignDto.designName,
      tileColor: UserDesignDto.tileColor,
      courtSize: UserDesignDto.courtSize,
    };
    try {
      const existingDesign = await this.userDesignModel
        .findOneAndUpdate(
          { _id: id },
          { $set: updateUserDesign, $currentDate: { updatedAt: true } },
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
      await this.userDesignModel.findOneAndUpdate(
        { _id: id },
        { $set: { isDeleted: true }, $currentDate: { updatedAt: true } },
      );
      return true;
    } catch {
      return false;
    }
  }
}
