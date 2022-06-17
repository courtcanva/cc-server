/*import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CourtSpecService } from './court_spec.service';
import { CourtSpec } from './schemas/court_spec.schema';
import { createMock } from '@golevelup/ts-jest';
import { Model, Query } from 'mongoose';
import { HttpException } from '@nestjs/common';

const mockCourt = {
  name: 'Court #1',
  length: 10000,
  width: 2000,
  centre_circle_radius: 1800,
  three_point_radius: 6000,
  three_point_line: 2300,
  length_of_corner: 2000,
  restricted_area_length: 2000,
  restricted_area_width: 2000,
  side_border_width: 2000,
  line_border_width: 50,
  description: 'Court #1',
};

const courtArray = [
  {
    name: 'Court #1',
    length: 10000,
    width: 2000,
    centre_circle_radius: 1800,
    three_point_radius: 6000,
    three_point_line: 2300,
    length_of_corner: 2000,
    restricted_area_length: 2000,
    restricted_area_width: 2000,
    side_border_width: 2000,
    line_border_width: 50,
    description: 'Court #1',
  },
  {
    name: 'Court #2',
    length: 10000,
    width: 2000,
    centre_circle_radius: 1800,
    three_point_radius: 6000,
    three_point_line: 2300,
    length_of_corner: 2000,
    restricted_area_length: 2000,
    restricted_area_width: 2000,
    side_border_width: 2000,
    line_border_width: 50,
    description: 'Court #2',
  },
];

describe('CourtSpecService', () => {
  let service: CourtSpecService;
  let model: Model<CourtSpec>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourtSpecService,
        {
          provide: getModelToken(CourtSpec.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockCourt),
            constructor: jest.fn().mockResolvedValue(mockCourt),
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            findOneAndUpdate: jest.fn(),
            remove: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(CourtSpecService);
    model = module.get<Model<CourtSpec>>(getModelToken(CourtSpec.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all courts', async () => {
    jest.spyOn(model, 'find').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(courtArray),
    } as any);
    const courts = await service.getAllCourtSizes();
    expect(courts).toEqual(courtArray);
  });

  it('should get one court by name', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockCourt),
      }) as any,
    );
    const courts = await service.getCourtSpecById('1');
    expect(courts).toEqual(mockCourt);
  });

  it('should insert a new court', async () => {
    const foundCourt = jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockCourt),
      }) as any,
    );

    const throwException = () => {
      throw new HttpException(`name already exists, please try another name`, 400);
    };
    if (foundCourt) {
      expect(throwException).toThrow(HttpException);
      expect(throwException).toThrow('name already exists, please try another name');
    }

    jest.spyOn(model, 'create').mockImplementationOnce(() => Promise.resolve(mockCourt));
    const newCourt = await service.create(mockCourt);
    expect(newCourt).toEqual(mockCourt);
  });

  it('should update a court successfully', async () => {
    jest.spyOn(model, 'findOneAndUpdate').mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockCourt),
      }) as any,
    );
    const updatedCat = await service.updateCourtSpecById('1', mockCourt);
    expect(updatedCat).toEqual(mockCourt);
  });

  it('should delete a court successfully', async () => {
    jest.spyOn(model, 'remove').mockResolvedValueOnce(true as any);
    expect(await service.removeCourtSpecById('1')).toEqual({ deleted: true });
  });
  it('should not delete a court', async () => {
    jest.spyOn(model, 'remove').mockRejectedValueOnce(new Error('Bad delete'));
    expect(await service.removeCourtSpecById('1')).toEqual({
      deleted: false,
      message: 'Bad delete',
    });
  });
});
*/

const sub = (a: number, b: number): number => {
  return a - b;
};

test("sub should return correct value", () => {
  expect(sub(2, 1)).toBe(1);
});
