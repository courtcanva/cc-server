import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CourtSpecService } from './court_spec.service';
import { CreateCourtSpecDto } from './dto/create-court_spec.dto';
import { UpdateCourtSpecDto } from './dto/update-court_spec.dto';
import { CourtSpec } from './schemas/court_spec.schema';

@Controller('court_spec')
export class CourtSpecController {
  constructor(private readonly courtSpecService: CourtSpecService) {}

  @Get()
  async getAllCourtSizes(): Promise<CourtSpec[]> {
    return await this.courtSpecService.getAllCourtSizes();
  }

  @Get(':name')
  async getCourtSpecByName(@Param('name') name: string): Promise<CourtSpec> {
    return await this.courtSpecService.getCourtSpecByName(name);
  }

  @Post()
  async create(@Body() createCourtSpecDto: CreateCourtSpecDto): Promise<CourtSpec> {
    return await this.courtSpecService.create(createCourtSpecDto);
  }

  @Patch(':name')
  async update(
    @Param('name') name: string,
    @Body() updateCourtSpecDto: UpdateCourtSpecDto,
  ): Promise<CourtSpec> {
    return await this.courtSpecService.updateCourtSpecByName(name, updateCourtSpecDto);
  }

  @Delete(':name')
  async remove(@Param('name') name: string): Promise<{ deleted: boolean; message?: string }> {
    return await this.courtSpecService.removeCourtSpecByName(name);
  }
}
