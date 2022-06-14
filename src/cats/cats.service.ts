import { UpdateCatDto } from './dto/update-cat.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat> {
    const cat = await this.catModel.findOne({ _id: id }).exec();
    if (!cat) {
      throw new NotFoundException(`Cat ${id} not found`);
    }
    return cat;
  }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat = await this.catModel.create(createCatDto);
    return cat;
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const existingCat = await this.catModel
      .findOneAndUpdate({ _id: id }, { $set: updateCatDto }, { new: true })
      .exec();

    // if (!existingCat) {
    //   throw new NotFoundException(`Cat ${id} not found`);
    // }
    return existingCat;
  }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.catModel.remove({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
