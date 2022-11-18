import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, SortOrder } from "mongoose";
import { CartItem } from "./schemas/cartItem.schema";
import { CreateCartItemDto } from "./dto/create-cartItem.dto";
import { UpdateCartItemDto } from "./dto/update-cartItem.dto";
import { FindCartItemListByAdminDto, FindAllCartItemDto } from "./dto/findAll-cartItem.dto";
import { User } from "../users/schemas/user.schema";
import { ObjectId } from "mongoose";
import { PaginationQueryDto } from "src/utils/PaginationDto/pagination-query.dto";
import { ExpireDay } from "../expire_day/schemas/expireDay.schema";

@Injectable()
export class CartItemService {
  constructor(
    @InjectModel(CartItem.name) private readonly cartItemModel: Model<CartItem>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(ExpireDay.name) private readonly ExpireDayModel: Model<ExpireDay>,
  ) {}

  async findAll(findAllCartItem: FindAllCartItemDto): Promise<CartItem[]> {
    const { user_id, limit = 0, offset = 0 } = findAllCartItem;
    if (user_id === "") {
      throw new NotFoundException("userId cannot be empty string");
    }
    const optionalQuery: { [key: string]: any } = {};
    if (user_id) optionalQuery.user_id = user_id;
    const cartItem = await this.cartItemModel
      .find({ isDeleted: false, ...optionalQuery })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();

    cartItem.map((item) => {
      const dateNow = new Date().getTime();
      const createDate = item["createdAt"].getTime();
      const expireTime = item.expireDay * 24 * 3600 * 1000;
      const hasExpired = createDate + expireTime - dateNow;
      if (hasExpired < 0) {
        item["isExpired"] = true;
      } else {
        item["isExpired"] = false;
      }
    });

    return cartItem;
  }

  async findCartItemListByAdmin(
    findCartItemListByAdmin: PaginationQueryDto & FindCartItemListByAdminDto,
  ): Promise<{
    data: CartItem[];
    total: number;
  }> {
    const { limit = 0, offset = 0, user_id, sort, desc } = findCartItemListByAdmin;

    const optionalQuery = {};
    if (user_id) {
      optionalQuery["user_id"] = user_id;
    }
    const sorting = sort ? { [sort]: desc } : { createdAt: -1 };
    const cartItems = await this.cartItemModel
      .find({
        $and: [{ isDeleted: false }],
        $or: [optionalQuery],
      })
      .sort(sorting as { [key: string]: SortOrder | { $meta: "textScore" } })
      .skip(offset)
      .limit(limit)
      .exec();
    const total = await this.cartItemModel.countDocuments({
      $and: [{ isDeleted: false }],
      $or: [optionalQuery],
    });
    return { data: cartItems, total };
  }

  async findOne(id: ObjectId): Promise<CartItem> {
    const cartItem = await this.cartItemModel.findOne({ _id: id }).exec();
    if (!cartItem) {
      throw new NotFoundException(`Cart Item #${id} not found`);
    }
    return cartItem;
  }

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    /* To dos
    It's to validate to verify if user exists in the database. It is logical, but 
    this limitation make it difficult to test related cards later (ie. 
    dev must register before adding items).

    Also, I tested this function and found that my user_id is not created in the database 
    after I register in front-end, which prevents me from adding the item to the shopping cart 
    (due to this restriction codes). So I temporarily disabled this restriction until this bug is fixed.
    */
    const { user_id } = createCartItemDto;
    try {
      await this.userModel.find({ isDeleted: false, _id: user_id });
    } catch {
      throw new NotFoundException(
        `Cannot add item to shopping cart, because user #${user_id} not found.`,
      );
    }
    const expireDay = await this.ExpireDayModel.findOne({}).exec();
    const cartItem = await this.cartItemModel.create({
      ...createCartItemDto,
      expireDay: expireDay.expireDays,
    });
    return cartItem;
  }

  async update(id: ObjectId, updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
    const cartItem = await this.cartItemModel
      .findByIdAndUpdate({ _id: id }, { $set: updateCartItemDto }, { new: true })
      .exec();
    if (!cartItem) {
      throw new NotFoundException(`Cart Item #${id} not found`);
    }
    return cartItem;
  }

  async remove(id: ObjectId): Promise<boolean> {
    const response = await this.cartItemModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: { isDeleted: true } },
    );
    if (!response) return false;
    return true;
  }
}
