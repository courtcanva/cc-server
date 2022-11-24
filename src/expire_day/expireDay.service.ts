import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ExpireDayDto } from "./dto/expireDay.dto";
import { ExpireDay } from "./schemas/expireDay.schema";

@Injectable()
export class ExpireDayService {
  constructor(@InjectModel(ExpireDay.name) private readonly expireDayModel: Model<ExpireDay>) {}

  async findOne(): Promise<ExpireDay> {
    const response = await this.expireDayModel.findOne({}).exec();
    if (!response) throw new NotFoundException("fail to find expireDay");
    return response;
  }

  async update(expireDay: ExpireDayDto): Promise<ExpireDay> {
    return await this.expireDayModel
      .findOneAndUpdate({}, { $set: expireDay }, { new: true })
      .exec();
  }
}
