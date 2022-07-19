import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserDesignService } from "./userDesign.service";
import { UserDesignController } from "./userDesign.controller";
import { UserDesign, UserDesignSchema } from "./schemas/userDesign.schema";
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserDesign.name,
        schema: UserDesignSchema,
      },
    ]),
  ],
  controllers: [UserDesignController],
  providers: [UserDesignService],
})
export class UserDesignModule {}
