import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { FindAllOrderDto, GetOrdersFilterDto } from "./dto/findAllOrder.dto";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { UpdateOrderDto } from "./dto/updateOrder.dto";
import { Order } from "./schemas/order.schema";
import { ObjectId } from "mongoose";
import { PaginationQueryDto } from "../utils/PaginationDto/pagination-query.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  //this route is used by cc-app
  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Query() findAllOrder: FindAllOrderDto & PaginationQueryDto): Promise<Order[]> {
    return await this.orderService.findAll(findAllOrder);
  }

  //this route is used by app-admin
  @Get("/admin")
  // TODO need header work on app-admin proj
  @UseGuards(AuthGuard)
  async findAllByFilters(
    @Query() findAllByfilterDto: GetOrdersFilterDto & PaginationQueryDto,
  ): Promise<{ data: Order[]; total: number }> {
    return await this.orderService.findAllByFilters(findAllByfilterDto);
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  async findOne(@Param("id") id: ObjectId): Promise<Order> {
    return await this.orderService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createOrder: CreateOrderDto): Promise<Order> {
    return await this.orderService.create(createOrder);
  }

  @Put(":id")
  @UseGuards(AuthGuard)
  async update(@Param("id") id: ObjectId, @Body() updateOrder: UpdateOrderDto): Promise<Order> {
    return await this.orderService.update(id, updateOrder);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  async remove(@Param("id") id: ObjectId): Promise<boolean> {
    return await this.orderService.remove(id);
  }
}
