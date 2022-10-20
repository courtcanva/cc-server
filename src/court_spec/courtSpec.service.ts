import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCourtSpecDto } from "./dto/create-courtSpec.dto";
import { UpdateCourtSpecDto } from "./dto/update-courtSpec.dto";
import { CourtSpec } from "./schemas/courtSpec.schema";
import { ObjectId } from "mongoose";
import { PaginationQueryDto } from "src/utils/PaginationDto/pagination-query.dto";

@Injectable()
export class CourtSpecService {
  constructor(@InjectModel(CourtSpec.name) private readonly courtSpecModel: Model<CourtSpec>) {}

  async create(createCourtSpecDto: CreateCourtSpecDto): Promise<CourtSpec> {
    createCourtSpecDto = { ...createCourtSpecDto };
    const court_spec = await this.courtSpecModel.create(createCourtSpecDto);
    return court_spec;
  }

  async getAllCourtSizes(paginationQuery: PaginationQueryDto): Promise<CourtSpec[]> {
    const { limit, offset } = paginationQuery;
    const courts = await this.courtSpecModel.find().skip(offset).limit(limit).exec();
    return courts.filter((item) => !item.isDeleted);
  }

  async getCourtSpecById(courtId: ObjectId): Promise<CourtSpec> {
    const court = await this.courtSpecModel.findById(courtId).exec();
    if (!court || court.isDeleted) {
      throw new NotFoundException("court not found");
    }
    return court;
  }

  async updateCourtSpecById(
    courtId: ObjectId,
    updateCourtSpecDto: UpdateCourtSpecDto,
  ): Promise<CourtSpec> {
    const court = await this.courtSpecModel.findById(courtId).exec();
    if (!court || court.isDeleted) {
      throw new NotFoundException("court not found");
    }
    updateCourtSpecDto = { ...updateCourtSpecDto };
    const updatedCourtSpec = await this.courtSpecModel
      .findByIdAndUpdate(courtId, { $set: updateCourtSpecDto }, { new: true })
      .exec();
    return updatedCourtSpec;
  }

  async removeCourtSpecById(courtId: ObjectId): Promise<boolean> {
    const court = await this.courtSpecModel.findById(courtId).exec();
    if (!court || court.isDeleted) {
      throw new NotFoundException("court not found");
    }

    const DeletedCount = await this.courtSpecModel.findByIdAndUpdate(courtId, {
      isDeleted: true,
    });

    return true;
  }
}
