import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CourtSpecService } from "./court_spec.service";
import { CreateCourtSpecDto } from "./dto/create-court_spec.dto";
import { UpdateCourtSpecDto } from "./dto/update-court_spec.dto";
import { CourtSpec } from "./schemas/court_spec.schema";
import { ParseObjectIdPipe } from "../../utils/ParseObjectIdPipe";
import { ObjectId } from "mongoose";

@Controller("courts")
export class CourtSpecController {
  constructor(private readonly courtSpecService: CourtSpecService) {}

  @Get()
  async getAllCourtSizes(): Promise<CourtSpec[]> {
    return await this.courtSpecService.getAllCourtSizes();
  }

  @Get(":courtId")
  async getCourtSpecById(
    @Param("courtId", ParseObjectIdPipe) courtId: ObjectId,
  ): Promise<CourtSpec> {
    return await this.courtSpecService.getCourtSpecById(courtId);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createCourtSpecDto: CreateCourtSpecDto): Promise<CourtSpec> {
    return await this.courtSpecService.create(createCourtSpecDto);
  }

  @Put(":courtId")
  @UsePipes(new ValidationPipe())
  async update(
    @Param("courtId", ParseObjectIdPipe) courtId: ObjectId,
    @Body() updateCourtSpecDto: UpdateCourtSpecDto,
  ): Promise<CourtSpec> {
    return await this.courtSpecService.updateCourtSpecById(courtId, updateCourtSpecDto);
  }

  @Delete(":courtId")
  async remove(
    @Param("courtId", ParseObjectIdPipe) courtId: ObjectId,
  ): Promise<{ message: string }> {
    return await this.courtSpecService.removeCourtSpecById(courtId);
  }
}
