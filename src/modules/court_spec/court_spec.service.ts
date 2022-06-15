import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourtSpecDto } from './dto/create-court_spec.dto';
import { UpdateCourtSpecDto } from './dto/update-court_spec.dto';
import { CourtSpec } from './schemas/court_spec.schema';

@Injectable()
export class CourtSpecService {
  constructor(@InjectModel(CourtSpec.name) private readonly courtSpecModel: Model<CourtSpec>) {}

  async create(createCourtSpecDto: CreateCourtSpecDto): Promise<CourtSpec> {
    const court_spec = await this.courtSpecModel.create(createCourtSpecDto);
    return court_spec;
  }

  async getAllCourtSizes(): Promise<CourtSpec[]> {
    return await this.courtSpecModel.find().exec();
  }

  async getCourtSpecByName(name: string): Promise<CourtSpec> {
    const court = await this.courtSpecModel.findOne({ name: name }).exec();
    if (!court) {
      throw new NotFoundException(`court ${name} not found`);
    }
    return court;
  }

  async updateCourtSpecByName(
    name: string,
    updateCourtSpecDto: UpdateCourtSpecDto,
  ): Promise<CourtSpec> {
    const existingCourtSpec = await this.courtSpecModel
      .findOneAndUpdate({ name: name }, { $set: updateCourtSpecDto }, { new: true })
      .exec();
    return existingCourtSpec;
  }

  async removeCourtSpecByName(name: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.courtSpecModel.remove({ name });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
