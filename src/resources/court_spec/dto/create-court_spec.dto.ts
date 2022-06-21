import { IsNumber, IsOptional, IsString, IsPositive, Length } from "class-validator";
export class CreateCourtSpecDto {
  @Length(5, 50, {
    message: "the court name need to be longer than 5 characters or shorter than 50 characters",
  })
  @IsString()
  readonly name: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  readonly length: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  readonly width: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  readonly centreCircleRadius: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  readonly threePointRadius: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  readonly threePointLine: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  readonly lengthOfCorner: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  readonly restrictedAreaLength: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  readonly restrictedAreaWidth: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  readonly sideBorderWidth: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  readonly lineBorderWidth: number;

  @IsString()
  @IsOptional()
  readonly description: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}
