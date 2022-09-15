import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DesignDto } from "../../designs/dto/design.dto";

export class QuotationDetail {
  color: string;
  quantity: number;
}

export class CreateCartItemDto extends DesignDto {
  @IsString()
  @IsNotEmpty()
  readonly quotation: string;

  @IsString()
  @IsOptional()
  readonly image: string;

  @IsArray()
  @IsNotEmpty()
  @Type(() => QuotationDetail)
  readonly quotationDetails: QuotationDetail[];
}
