import { IsArray, IsNotEmpty, IsObject } from "class-validator";
export class UserDesignDto {
  @IsObject()
  @IsNotEmpty()
  readonly design_id: { user_id: string; design_name: string };

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
