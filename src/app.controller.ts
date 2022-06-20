import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getCheck(): null {
    return null;
  }
}
