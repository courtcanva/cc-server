import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { ObjectId } from "mongodb";

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, ObjectId> {
  public transform(value: any): ObjectId {
    try {
      const transformedObjectId: ObjectId = ObjectId.createFromHexString(value);
      return transformedObjectId;
    } catch (error) {
      throw new BadRequestException("Validation failed (ObjectId is expected)");
    }
  }
}
