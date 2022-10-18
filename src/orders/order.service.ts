import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "./schemas/order.schema";
import { Model, ObjectId } from "mongoose";
import { FindAllOrderDto } from "./dto/findAllOrder.dto";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { UpdateOrderDto } from "./dto/updateOrder.dto";

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) {}

  async findAll(findAllOrder: FindAllOrderDto): Promise<Order[]> {
    const { user_id, limit = 0, offset = 0 } = findAllOrder;
    if (user_id === "") {
      throw new NotFoundException("userId cannot be empty string");
    }
    const optionalQuery: { [key: string]: any } = {};
    if (user_id) optionalQuery.user_id = user_id;

    return await this.orderModel
      .find({ isDeleted: false, ...optionalQuery })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async findOne(id: ObjectId): Promise<Order> {
    const order = await this.orderModel.findOne({ _id: id }).exec();
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async create(createOrder: CreateOrderDto): Promise<Order> {
    const order = await this.orderModel.create({
      ...createOrder,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return order;
  }

  async update(id: ObjectId, updateOrder: UpdateOrderDto): Promise<Order> {
    const order = await this.orderModel
      .findByIdAndUpdate(
        { _id: id },
        { $set: updateOrder, $currentDate: { updatedAt: true } },
        { new: true },
      )
      .exec();
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async remove(id: ObjectId): Promise<boolean> {
    try {
      await this.orderModel.findOneAndUpdate(
        { _id: id },
        { $set: { isDeleted: true }, $currentDate: { updatedAt: true } },
      );
      return true;
    } catch {
      return false;
    }
  }
}
