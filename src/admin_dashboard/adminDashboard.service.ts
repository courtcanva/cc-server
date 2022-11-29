import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "src/orders/schemas/order.schema";
import { PaymentInfo, PaymentInfoDocument } from "src/stripe/schemas/payment-information.schema";
import { TemplateDocument, TemplateItem } from "src/template_items/schemas/template.schema";
import { User } from "src/users/schemas/user.schema";
import { startOfToday, endOfToday, startOfYesterday, endOfYesterday, subWeeks } from "date-fns";

interface AdminDashboardData {
  totalSales: number;
  totalItemsSold: number;
  totalTemplates: number;
  totalPublishedTemplates: number;
  totalOrders: number;
  totalUnpaidOrders: number;
  totalPaidOrders: number;
  courtCategorySoldCountList: CourtCategorySoldCount[];
  todayTotalOrder: number;
  orderGrowth: number;
  todayTotalSales: number;
  saleGrowth: number;
  todayAddedUsers: number;
  userGrowth: number;
  todayAddedTemplates: number;
  templatesGrowth: number;
  recentOrders: Order[];
  lastSevenDaysTotalOrderAndSales: dailyTotalOrderAndSales[];
}

interface CourtCategorySoldCount {
  _id: string;
  count: number;
}

interface dailyTotalOrderAndSales {
  _id: number;
  orderCount: number;
  amountTotal: number;
}

@Injectable()
export class AdminDashboardService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(PaymentInfo.name) private readonly paymentInfoModel: Model<PaymentInfoDocument>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(TemplateItem.name) private readonly templateModel: Model<TemplateDocument>,
  ) {}

  async getDashboardData(): Promise<AdminDashboardData> {
    const totalSales = await this.paymentInfoModel.aggregate([
      { $group: { _id: null, amountTotal: { $sum: "$amountTotal" } } },
    ]);

    const courtCategorySoldCountList = await this.orderModel.aggregate([
      { $match: { paymentInfo: { $exists: true } } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.design.courtSize.name",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalItemsSold = courtCategorySoldCountList.reduce((total, item) => {
      return total + item.count;
    }, 0);

    const totalOrders = await this.orderModel.countDocuments();

    const totalUnpaidOrders = await this.orderModel.countDocuments({ status: "unpaid" });

    const totalPaidOrders = await this.orderModel.countDocuments({ status: "completed" });

    const totalTemplates = await this.templateModel.countDocuments({ isDeleted: false });

    const totalPublishedTemplates = await this.templateModel.countDocuments({
      isDeleted: false,
      status: "published",
    });

    const todayTotalOrder = await this.orderModel.countDocuments({
      createdAt: {
        $gte: startOfToday(),
        $lte: endOfToday(),
      },
    });
    const yesterdayTotalOrder = await this.orderModel.countDocuments({
      createdAt: {
        $gte: startOfYesterday(),
        $lte: endOfYesterday(),
      },
    });
    const orderGrowth = todayTotalOrder - yesterdayTotalOrder;

    const todayTotalSales = await this.orderModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfToday(),
            $lte: endOfToday(),
          },
        },
      },
      {
        $lookup: {
          from: "paymentinfos",
          localField: "paymentInfo",
          foreignField: "_id",
          as: "payment",
        },
      },
      { $unwind: "$payment" },
      { $group: { _id: null, amountTotal: { $sum: "$payment.amountTotal" } } },
    ]);
    const yesterdayTotalSales = await this.orderModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfYesterday(),
            $lte: endOfYesterday(),
          },
        },
      },
      {
        $lookup: {
          from: "paymentinfos",
          localField: "paymentInfo",
          foreignField: "_id",
          as: "payment",
        },
      },
      { $unwind: "$payment" },
      { $group: { _id: null, amountTotal: { $sum: "$payment.amountTotal" } } },
    ]);
    const todayTotalSalesValue =
      todayTotalSales.length !== 0 ? todayTotalSales[0].amountTotal / 100 : 0;
    const yesterdayTotalSalesValue =
      yesterdayTotalSales.length !== 0 ? yesterdayTotalSales[0].amountTotal / 100 : 0;
    const saleGrowth = todayTotalSalesValue - yesterdayTotalSalesValue;

    const todayAddedUsers = await this.userModel.countDocuments({
      createdAt: {
        $gte: startOfToday(),
        $lte: endOfToday(),
      },
      isActivated: true,
      isDeleted: false,
    });
    const yesterdayAddedUsers = await this.userModel.countDocuments({
      createdAt: {
        $gte: startOfYesterday(),
        $lte: endOfYesterday(),
      },
      isActivated: true,
      isDeleted: false,
    });
    const userGrowth = todayAddedUsers - yesterdayAddedUsers;

    const todayAddedTemplates = await this.templateModel.countDocuments({
      createdAt: {
        $gte: startOfToday(),
        $lte: endOfToday(),
      },
      isDeleted: false,
    });
    const yesterdayAddedTemplates = await this.templateModel.countDocuments({
      createdAt: {
        $gte: startOfYesterday(),
        $lte: endOfYesterday(),
      },
      isDeleted: false,
    });
    const templatesGrowth = todayAddedTemplates - yesterdayAddedTemplates;

    const recentOrders = await this.orderModel
      .find()
      .populate("paymentInfo")
      .sort({ createdAt: -1 })
      .limit(10)
      .exec();

    const lastSevenDaysTotalOrderAndSales = await this.orderModel.aggregate([
      {
        $lookup: {
          from: "paymentinfos",
          localField: "paymentInfo",
          foreignField: "_id",
          as: "payment",
        },
      },
      { $unwind: "$payment" },
      {
        $match: {
          createdAt: {
            $gte: subWeeks(endOfToday(), 1),
            $lte: endOfToday(),
          },
        },
      },
      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" },
          orderCount: { $sum: 1 },
          amountTotal: { $sum: "$payment.amountTotal" },
        },
      },
    ]);

    return {
      totalSales: totalSales.length !== 0 ? totalSales[0].amountTotal / 100 : 0,
      totalItemsSold,
      totalTemplates,
      totalPublishedTemplates,
      totalOrders,
      totalUnpaidOrders,
      totalPaidOrders,
      courtCategorySoldCountList,
      todayTotalOrder,
      orderGrowth,
      todayTotalSales: todayTotalSalesValue,
      saleGrowth,
      todayAddedUsers,
      userGrowth,
      todayAddedTemplates,
      templatesGrowth,
      recentOrders,
      lastSevenDaysTotalOrderAndSales,
    };
  }
}
