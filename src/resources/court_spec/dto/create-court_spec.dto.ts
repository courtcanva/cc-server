import { IsNumber, IsOptional, IsString, Length } from "class-validator";
export class CreateCourtSpecDto {
  @Length(5, 50, {
    message: "the court name need to be longer than 5 characters or shorter than 50 characters",
  })
  @IsString()
  readonly name: string;

  @IsNumber()
  @IsOptional()
  readonly length: number;

  @IsNumber()
  @IsOptional()
  readonly width: number;

  @IsNumber()
  @IsOptional()
  readonly centreCircleRadius: number;

  @IsNumber()
  @IsOptional()
  readonly threePointRadius: number;

  @IsNumber()
  @IsOptional()
  readonly threePointLine: number;

  @IsNumber()
  @IsOptional()
  readonly lengthOfCorner: number;

  @IsNumber()
  @IsOptional()
  readonly restrictedAreaLength: number;

  @IsNumber()
  @IsOptional()
  readonly restrictedAreaWidth: number;

  @IsNumber()
  @IsOptional()
  readonly sideBorderWidth: number;

  @IsNumber()
  @IsOptional()
  readonly lineBorderWidth: number;

  @IsString()
  @IsOptional()
  readonly description: string;
}
