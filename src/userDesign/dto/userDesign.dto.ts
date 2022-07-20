import { IsArray, IsNotEmpty, IsObject, IsString } from "class-validator";
export class UserDesignDto {
  @IsString()
  @IsNotEmpty()
  readonly user_id: string;

  @IsString()
  @IsNotEmpty()
  readonly designName: string;

  @IsArray()
  @IsNotEmpty()
  readonly tileColor: { location: string; color: string }[];

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

  readonly createdAt: Date;
  readonly updatedAt: Date;
}
