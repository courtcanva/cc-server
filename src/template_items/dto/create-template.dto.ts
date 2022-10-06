import { Type } from "class-transformer";
import { IsNotEmpty, IsObject, IsString, MaxLength, ValidateNested } from "class-validator";
import { Design } from "src/cart_items/dto/create-cartItem.dto";

export class CreateTemplateItemDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;
  // 需要readonly吗？

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Design)
  design: Design;

  @IsString()
  @MaxLength(200)
  description: string;

  // automaticly generate the tags??? or manual input？
}
