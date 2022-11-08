import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreatePaymentInfoDto } from "./create-payment-information.dto";

export class UpdatePaymentInfoDto extends PartialType(
  OmitType(CreatePaymentInfoDto, ["orderId", "currency", "amountTotal", "billingAddress"] as const),
) {}
