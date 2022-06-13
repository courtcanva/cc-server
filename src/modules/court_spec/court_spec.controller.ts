import { Controller, Get } from '@nestjs/common';
import { CourtSpecService } from './court_spec.service';

@Controller('/court-spec')
export class CourtSpecController {
  constructor(private readonly courtSpecService: CourtSpecService) {}

  @Get()
  getAllCourtSizes(): string {
    return this.courtSpecService.getAllCourtSizes();
  }

  @Get('/:name')
  getCourtSpecByName(): string {
    return this.courtSpecService.getCourtSpecByName();
  }
}
