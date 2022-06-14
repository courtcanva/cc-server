import { UpdateCatDto } from './dto/update-cat.dto';
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './schemas/cat.schema';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return await this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    return await this.catsService.findOne(id);
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return await this.catsService.create(createCatDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCatCto: UpdateCatDto): Promise<Cat> {
    return await this.catsService.update(id, updateCatCto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ deleted: boolean; message?: string }> {
    return await this.catsService.remove(id);
  }
}
