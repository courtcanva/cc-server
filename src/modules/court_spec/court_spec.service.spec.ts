import { Test, TestingModule } from '@nestjs/testing';
import { CourtSpecService } from './court_spec.service';

describe('CourtSpecService', () => {
  let service: CourtSpecService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourtSpecService],
    }).compile();

    service = module.get<CourtSpecService>(CourtSpecService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
