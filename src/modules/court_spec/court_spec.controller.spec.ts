import { Test, TestingModule } from '@nestjs/testing';
import { CourtSpecController } from './court_spec.controller';

describe('CourtSpecController', () => {
  let controller: CourtSpecController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourtSpecController],
    }).compile();

    controller = module.get<CourtSpecController>(CourtSpecController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
