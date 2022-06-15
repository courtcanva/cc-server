import { IsNumber, IsString } from 'class-validator';
export class CreateCourtSpecDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly length: number;

  @IsNumber()
  readonly width: number;

  @IsNumber()
  readonly centre_circle_radius: number;

  @IsNumber()
  readonly three_point_radius: number;

  @IsNumber()
  readonly three_point_line: number;

  @IsNumber()
  readonly length_of_corner: number;

  @IsNumber()
  readonly restricted_area_length: number;

  @IsNumber()
  readonly restricted_area_width: number;

  @IsNumber()
  readonly side_border_width: number;

  @IsNumber()
  readonly line_border_width: number;

  @IsString()
  readonly description: string;
}
