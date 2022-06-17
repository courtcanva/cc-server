import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourtSpecDto } from './dto/create-court_spec.dto';
import { UpdateCourtSpecDto } from './dto/update-court_spec.dto';
import { CourtSpec } from './schemas/court_spec.schema';

@Injectable()
export class CourtSpecService {
  constructor(@InjectModel(CourtSpec.name) private readonly courtSpecModel: Model<CourtSpec>) {}

  async create(createCourtSpecDto: CreateCourtSpecDto): Promise<CourtSpec> {
    const { name } = createCourtSpecDto;
    if (name.length < 5 || name.length > 50) {
      throw new HttpException(
        `name is shorter than 5 characters or longer than 50 characters`,
        400,
      );
    }

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
      throw new HttpException(`court not found`, 400);
    }
    return court;
  }

  async updateCourtSpecById(
    courtId: string,
    updateCourtSpecDto: UpdateCourtSpecDto,
  ): Promise<CourtSpec> {
    const updatedCourtSpec = await this.courtSpecModel
      .findByIdAndUpdate(courtId, { $set: updateCourtSpecDto }, { new: true })
      .exec();
    if (!updatedCourtSpec) {
      throw new HttpException(`court not found`, 400);
    }
    return updatedCourtSpec;
  }

  async removeCourtSpecById(courtId: string): Promise<{ message: string }> {
    const isNotDeleted = await this.courtSpecModel.findByIdAndUpdate(courtId, { isDeleted: true });
    if (!isNotDeleted) {
      throw new HttpException(`court not found and deletion failed`, 400);
    }
    return { message: `court deleted successfully` };
  }
}
