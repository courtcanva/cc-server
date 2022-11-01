import { Optional } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsObject, IsString } from "class-validator";

export class Color {
  location: string;
  color: string;
}
export class DesignDto {
  @IsString()
  @IsNotEmpty()
  readonly user_id: string;

  @IsString()
  @IsNotEmpty()
  readonly designName: string;

  @IsArray()
  @IsNotEmpty()
  @Type(() => Color)
  readonly tileColor: Color[];

  @IsObject()
  @IsNotEmpty()
  readonly courtSize: {
    name: string;
    length: number;
    width: number;
    centreCircleRadius: number;
    threePointRadius: number;
    threePointLine: number;
    lengthOfCorner: number;
    restrictedAreaLength: number;
    restrictedAreaWidth: number;
    sideBorderWidth: number;
    lineBorderWidth: number;
  };

  // @IsString()
  // @IsNotEmpty()
  @Optional()
  readonly image: string;
}
