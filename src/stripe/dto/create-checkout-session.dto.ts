import { IsNotEmpty, IsString } from "class-validator";
import { CreateOrderDto } from "src/orders/dto/createOrder.dto";

export class CreateCheckoutSessionDto extends CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  order_Id: string;
}
