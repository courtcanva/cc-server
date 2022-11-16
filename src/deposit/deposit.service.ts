import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DepositDto } from "./dto/deposit.dto";
import { Deposit } from "./schemas/deposit.schema";

@Injectable()
export class DepositService {
  constructor(@InjectModel(Deposit.name) private readonly depositModel: Model<Deposit>) {}

  async findOne(): Promise<Deposit> {
    const response = await this.depositModel.findOne({}).exec();
    if (!response) throw new NotFoundException("fail to find deposit");
    return response;
  }

  async update(deposit: DepositDto): Promise<Deposit> {
    return await this.depositModel.findOneAndUpdate({}, { $set: deposit }, { new: true }).exec();
  }
}
