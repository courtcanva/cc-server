import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { TemplateItem, TemplateSchema } from "./schemas/template.schema";
import { TemplateItemController } from "./templateItem.controller";
import { TemplateItemService } from "./templateItem.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TemplateItem.name,
        schema: TemplateSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [TemplateItemController],
  providers: [TemplateItemService],
})
export class TemplateItemsModule {}
