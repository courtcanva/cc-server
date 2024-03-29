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
  Query,
} from "@nestjs/common";
import { CourtSpecService } from "./courtSpec.service";
import { CreateCourtSpecDto } from "./dto/create-courtSpec.dto";
import { UpdateCourtSpecDto } from "./dto/update-courtSpec.dto";
import { CourtSpec } from "./schemas/courtSpec.schema";
import { ParseObjectIdPipe } from "../utils/ParseObjectIdPipe";
import { ObjectId } from "mongoose";
import { PaginationQueryDto } from "../utils/PaginationDto/pagination-query.dto";

@Controller("courts")
export class CourtSpecController {
  constructor(private readonly courtSpecService: CourtSpecService) {}

  @Get()
  async getAllCourtSizes(@Query() paginationQuery: PaginationQueryDto): Promise<CourtSpec[]> {
    const { limit, offset } = paginationQuery;
    return await this.courtSpecService.getAllCourtSizes(paginationQuery);
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
  async remove(@Param("courtId", ParseObjectIdPipe) courtId: ObjectId): Promise<boolean> {
    return await this.courtSpecService.removeCourtSpecById(courtId);
  }
}
