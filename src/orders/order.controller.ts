import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { OrderService } from "./order.service";
import { FindAllOrderDto } from "./dto/findAllOrder.dto";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { UpdateOrderDto } from "./dto/updateOrder.dto";
import { Order } from "./schemas/order.schema";
import { ObjectId } from "mongoose";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll(@Query() findAllOrder: FindAllOrderDto): Promise<Order[]> {
    return await this.orderService.findAll(findAllOrder);
  }

  @Get(":id")
  async findOne(@Param("id") id: ObjectId): Promise<Order> {
    return await this.orderService.findOne(id);
  }

  @Post()
  async create(@Body() createOrder: CreateOrderDto): Promise<Order> {
    return await this.orderService.create(createOrder);
  }

  @Put(":id")
  async update(@Param("id") id: ObjectId, @Body() updateOrder: UpdateOrderDto): Promise<Order> {
    return await this.orderService.update(id, updateOrder);
  }

  @Delete(":id")
  async remove(@Param("id") id: ObjectId): Promise<boolean> {
    return await this.orderService.remove(id);
  }
}
