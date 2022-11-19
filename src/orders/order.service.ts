import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order, StatusType } from "./schemas/order.schema";
import { Model, ObjectId, Types } from "mongoose";
import { FindAllOrderDto, GetOrdersFilterDto } from "./dto/findAllOrder.dto";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { UpdateOrderDto } from "./dto/updateOrder.dto";
import { PaginationQueryDto } from "src/utils/PaginationDto/pagination-query.dto";

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) {}
  //findAll is for cc-app order, need exact search
  async findAll(findAllOrder: FindAllOrderDto): Promise<Order[]> {
    const { user_id, limit = 0, offset = 0 } = findAllOrder;
    if (user_id === "") {
      throw new NotFoundException("userId cannot be empty string");
    }
    const optionalQuery: { [key: string]: any } = {};
    if (user_id) optionalQuery.user_id = user_id;

    return await this.orderModel
      .find({ ...optionalQuery })
      .populate("paymentInfo")
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  //find is for admin only
  async findAllByFilters(filterDto: GetOrdersFilterDto): Promise<{ data: Order[]; total: number }> {
    const { user_id, status, limit = 0, offset = 0 } = filterDto;
    const statusQuery: { [key: string]: any } = {};
    const searchQuery: { [key: string]: any } = {};

    if (user_id) searchQuery.user_id = user_id;
    if (user_id) statusQuery.user_id = user_id;
    if (status) statusQuery.status = status;
    console.log("searchQuer", searchQuery);
    console.log("statusQuery", statusQuery);
    const qRegExp = new RegExp(`.*${searchQuery}.*`, "i");
    //console.log("qRegExp",qRegExp)
    const ordersData = await this.orderModel
      .find({
        $and: [{ $or: [statusQuery] }, { user_id: qRegExp }],
      })
      .populate("paymentInfo")
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();

    const total = await this.orderModel.countDocuments({
      $and: [{ $or: [statusQuery] }, { searchQuery }],
    });

    return {
      data: ordersData,
      total,
    };
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
    });
    return order;
  }

  async update(id: ObjectId, updateOrder: UpdateOrderDto): Promise<Order> {
    const order = await this.orderModel
      .findByIdAndUpdate({ _id: id }, { $set: updateOrder }, { new: true })
      .exec();
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async updatePayment(
    id: ObjectId,
    updateInfo: { status?: StatusType; paymentInfo?: Types.ObjectId },
  ): Promise<Order> {
    const order = await this.orderModel
      .findByIdAndUpdate({ _id: id }, { $set: { ...updateInfo } }, { new: true })
      .exec();
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async remove(id: ObjectId): Promise<boolean> {
    const order = await this.orderModel.findOneAndUpdate(
      { _id: id },
      { $set: { status: "cancelled" } },
    );
    if (!order) {
      return false;
    }
    return true;
  }
}
