import { Injectable } from '@nestjs/common';

@Injectable()
export class CourtSpecService {
  // for test only, later can write code here
  getAllCourtSizes(): string {
    return 'nest 我来了！';
  }

  // for test only, later can write code here
  getCourtSpecByName(): string {
    return 'nestByName带复选框';
  }
}
