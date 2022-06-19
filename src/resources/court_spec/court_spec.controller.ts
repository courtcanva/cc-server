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
  BadRequestException,
} from "@nestjs/common";
import { CourtSpecService } from "./court_spec.service";
import { CreateCourtSpecDto } from "./dto/create-court_spec.dto";
import { UpdateCourtSpecDto } from "./dto/update-court_spec.dto";
import { CourtSpec } from "./schemas/court_spec.schema";

@Controller("courts")
export class CourtSpecController {
  constructor(private readonly courtSpecService: CourtSpecService) {}

  @Get()
  async getAllCourtSizes(): Promise<CourtSpec[]> {
    return await this.courtSpecService.getAllCourtSizes();
  }

  @Get(":courtId")
  async getCourtSpecById(@Param("courtId") courtId: string): Promise<CourtSpec> {
    try {
      return await this.courtSpecService.getCourtSpecById(courtId);
    } catch (error) {
      throw new BadRequestException({ status: 400, message: "court not found!" });
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createCourtSpecDto: CreateCourtSpecDto): Promise<CourtSpec> {
    return await this.courtSpecService.create(createCourtSpecDto);
  }

  @Put(":courtId")
  @UsePipes(new ValidationPipe())
  async update(
    @Param("courtId") courtId: string,
    @Body() updateCourtSpecDto: UpdateCourtSpecDto,
  ): Promise<CourtSpec> {
    try {
      return await this.courtSpecService.updateCourtSpecById(courtId, updateCourtSpecDto);
    } catch (error) {
      throw new BadRequestException({ status: 400, message: "court not found!" });
    }
  }

  @Delete(":courtId")
  async remove(@Param("courtId") courtId: string): Promise<{ message: string }> {
    try {
      return await this.courtSpecService.removeCourtSpecById(courtId);
    } catch (error) {
      throw new BadRequestException({ status: 400, message: "court not found!" });
    }
  }
}
