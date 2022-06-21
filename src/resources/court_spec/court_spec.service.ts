import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCourtSpecDto } from "./dto/create-court_spec.dto";
import { UpdateCourtSpecDto } from "./dto/update-court_spec.dto";
import { CourtSpec } from "./schemas/court_spec.schema";

@Injectable()
export class CourtSpecService {
  constructor(@InjectModel(CourtSpec.name) private readonly courtSpecModel: Model<CourtSpec>) {}

  async create(createCourtSpecDto: CreateCourtSpecDto): Promise<CourtSpec> {
    createCourtSpecDto = { ...createCourtSpecDto, createdAt: new Date(), updatedAt: new Date() };
    const court_spec = await this.courtSpecModel.create(createCourtSpecDto);
    return court_spec;
  }

  async getAllCourtSizes(): Promise<CourtSpec[]> {
    const courts = await this.courtSpecModel.find().exec();
    return courts.filter((item) => !item.isDeleted);
  }

  async getCourtSpecById(courtId: string): Promise<CourtSpec> {
    const court = await this.courtSpecModel.findById(courtId).exec();
    if (!court || court.isDeleted) {
      throw new BadRequestException({ status: 400, message: "court not found!" });
    }
    return court;
  }

  async updateCourtSpecById(
    courtId: string,
    updateCourtSpecDto: UpdateCourtSpecDto,
  ): Promise<CourtSpec> {
    const court = await this.courtSpecModel.findById(courtId);
    console.log(court);
    if (!court || court.isDeleted) {
      throw new BadRequestException({ status: 400, message: "court not found!" });
    }
    updateCourtSpecDto = { ...updateCourtSpecDto, updatedAt: new Date() };
    const updatedCourtSpec = await this.courtSpecModel
      .findByIdAndUpdate(courtId, { $set: updateCourtSpecDto }, { new: true })
      .exec();
    return updatedCourtSpec;
  }

  async removeCourtSpecById(courtId: string): Promise<{ message: string }> {
    const court = await this.courtSpecModel.findById(courtId).exec();
    if (!court || court.isDeleted) {
      throw new BadRequestException({
        status: 400,
        message: "court not found and deletion failed.",
      });
    }
    const DeletedCount = await this.courtSpecModel.findByIdAndUpdate(courtId, {
      isDeleted: true,
      updatedAt: new Date(),
    });
    return { message: `Court ${DeletedCount.name.toUpperCase()} deleted successfully` };
  }
}
