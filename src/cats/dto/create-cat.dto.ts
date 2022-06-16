import { IsNumber, IsPositive, IsString } from "class-validator";
export class CreateCatDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  @IsPositive()
  readonly age: number;

  @IsString()
  readonly breed: string;

  @IsString({ each: true })
  readonly tag: string[];
}
