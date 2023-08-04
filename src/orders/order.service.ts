import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order, StatusType } from "./schemas/order.schema";
import { Model, ObjectId, Types } from "mongoose";
import { FindAllOrderDto, GetOrdersFilterDto } from "./dto/findAllOrder.dto";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { UpdateOrderDto } from "./dto/updateOrder.dto";
import { PaginationQueryDto } from "src/utils/PaginationDto/pagination-query.dto";
import { ExpireDayService } from "src/expire_day/expireDay.service";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    private readonly expireDayService: ExpireDayService,
  ) {}
  //findAll is for cc-app order, need exact search
  async findAll(findAllOrder: FindAllOrderDto & PaginationQueryDto): Promise<Order[]> {
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

  async updateManyIsExpired(): Promise<void> {
    const nowDate = new Date();
    await this.orderModel.updateMany(
      { status: StatusType.UNPAID, isExpired: false, expiredAt: { $lt: nowDate } },
      { $set: { isExpired: true } },
    );
  }

  //find is for admin only
  async findAllByFilters(
    findAllByfilterDto: GetOrdersFilterDto & PaginationQueryDto,
  ): Promise<{ data: Order[]; total: number }> {
    const { user_id, status, limit = 0, offset = 0 } = findAllByfilterDto;
    const filterQuery: Record<string, any> = {
      ...(user_id ? { user_id: { $regex: user_id, $options: "i" } } : {}),
      ...(status ? { status } : {}),
    };
    const ordersData = await this.orderModel
      .find(filterQuery)
      .populate("paymentInfo")
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();

    const total = await this.orderModel.countDocuments({ filterQuery });

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
    const expireDay = await this.expireDayService.findOne();
    const order = await this.orderModel.create({
      ...createOrder,
      expireDay: expireDay.expireDays,
      expiredAt: new Date().getTime() + expireDay.expireDays * 24 * 3600 * 1000,
      isExpired: false,
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
