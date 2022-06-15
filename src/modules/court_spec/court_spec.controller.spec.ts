import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCourtSpecDto } from './dto/update-court_spec.dto';
import { CreateCourtSpecDto } from './dto/create-court_spec.dto';
import { CourtSpecController } from './court_spec.controller';
import { CourtSpecService } from './court_spec.service';

describe('CourtSpecController', () => {
  let controller: CourtSpecController;
  let service: CourtSpecService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourtSpecController],
      providers: [
        {
          provide: CourtSpecService,
          useValue: {
            getAllCourtSizes: jest.fn().mockResolvedValue([
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
            ]),
            getCourtSpecByName: jest.fn().mockImplementation((name: string) =>
              Promise.resolve({
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
              }),
            ),
            create: jest
              .fn()
              .mockImplementation((createCourtSpecDto: CreateCourtSpecDto) =>
                Promise.resolve({ name: 'Court #1', ...createCourtSpecDto }),
              ),
            update: jest
              .fn()
              .mockImplementation((name: string, updateCourtSpecDto: UpdateCourtSpecDto) =>
                Promise.resolve({ name: 'Court #1', ...updateCourtSpecDto }),
              ),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<CourtSpecController>(CourtSpecController);
    service = module.get<CourtSpecService>(CourtSpecService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllCourtSizes', () => {
    it('should get an array of courts', () => {
      expect(controller.getAllCourtSizes()).resolves.toEqual([
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
      ]);
    });
  });

  describe('getCourtSpecByName', () => {
    it('should get a single court', () => {
      expect(controller.getCourtSpecByName('Court #1')).resolves.toEqual({
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
      });
    });
  });

  // describe('create()', () => {
  //   it('should create a new court spec', async () => {
  //     const createCourtSpecDto: CreateCourtSpecDto = {
  //       name: 'Court #1',
  //       length: 10000,
  //       width: 2000,
  //       centre_circle_radius: 1800,
  //       three_point_radius: 6000,
  //       three_point_line: 2300,
  //       length_of_corner: 2000,
  //       restricted_area_length: 2000,
  //       restricted_area_width: 2000,
  //       side_border_width: 2000,
  //       line_border_width: 50,
  //       description: 'Court #1',
  //     };

  //     expect(controller.create(createCourtSpecDto)).resolves.toEqual({
  //       _id: '1',
  //       ...createCourtSpecDto,
  //     });
  //   });
  // });
  // describe('updateCourt', () => {
  //   it('should update a court', () => {
  //     const updateCourtSpecDto: UpdateCourtSpecDto = {
  //       name: 'Court #2',
  //       length: 10000,
  //       width: 2000,
  //       centre_circle_radius: 1800,
  //       three_point_radius: 6000,
  //       three_point_line: 2300,
  //       length_of_corner: 2000,
  //       restricted_area_length: 2000,
  //       restricted_area_width: 2000,
  //       side_border_width: 2000,
  //       line_border_width: 50,
  //       description: 'Court #2',
  //     };
  //     expect(controller.update('Court #2', updateCourtSpecDto)).resolves.toEqual({
  //       _id: '2',
  //       ...updateCourtSpecDto,
  //     });
  //   });
  // });
  // describe('deleteCourt', () => {
  //   it('should return that it deleted a court', () => {
  //     expect(controller.remove('a uuid that exists')).resolves.toEqual({
  //       deleted: true,
  //     });
  //   });
  //   it('should return that it did not delete a court', () => {
  //     const deleteSpy = jest
  //       .spyOn(service, 'removeCourtSpecByName')
  //       .mockResolvedValueOnce({ deleted: false });
  //     expect(controller.remove('a uuid that does not exist')).resolves.toEqual({
  //       deleted: false,
  //     });
  //     expect(deleteSpy).toBeCalledWith('a uuid that does not exist');
  //   });
  // });
});
