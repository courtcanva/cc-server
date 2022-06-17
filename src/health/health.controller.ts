import { Controller, Get } from "@nestjs/common";
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  MongooseHealthIndicator,
} from "@nestjs/terminus";

@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck("courtcanva", process.env.FRONTEND_URL),
      () => this.db.pingCheck("mongoose"),
    ]);
  }
}
