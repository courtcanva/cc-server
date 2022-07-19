import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
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

  async findOne(design_id: { user_id: string; design_name: string }): Promise<UserDesign> {
    try {
      const userDesign = await this.userDesignModel.findOne({ design_id: design_id }).exec();
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

  async update(
    design_id: { user_id: string; design_name: string },
    UserDesignDto: UserDesignDto,
  ): Promise<UserDesign> {
    const updateUserDesign = {
      ...UserDesignDto,
      design_id: UserDesignDto.design_id,
      tileColor: UserDesignDto.tileColor,
      courtSize: UserDesignDto.courtSize,
    };
    try {
      const existingDesign = await this.userDesignModel
        .findOneAndUpdate(
          { design_id: design_id },
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

  async remove(design_id: { user_id: string; design_name: string }): Promise<boolean> {
    try {
      await this.userDesignModel.findOneAndUpdate(
        { design_id: design_id },
        { $set: { isDeleted: true }, $currentDate: { updatedAt: true } },
      );
      return true;
    } catch {
      return false;
    }
  }
}
