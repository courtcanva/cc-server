import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CartItem } from "./schemas/cart_item.schema";
import { CreateCartItemDto } from "./dto/create-cart_item.dto";
import { UpdateCartItemDto } from "./dto/update-cart_item.dto";
import { FindAllCartItemDto } from "./dto/findAll-cart_item.dto";
import { User } from "../users/schemas/user.schema";

@Injectable()
export class CartItemService {
  constructor(
    @InjectModel(CartItem.name) private readonly cartItemModel: Model<CartItem>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(findAllCartItem: FindAllCartItemDto): Promise<CartItem[]> {
    const { userId, limit = 0, offset = 0 } = findAllCartItem;
    const optionalQuery: { [key: string]: any } = {};
    if (userId) optionalQuery.user_id = userId;

    return await this.cartItemModel
      .find({ isDeleted: false, ...optionalQuery })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<CartItem> {
    const cartItem = await this.cartItemModel.findOne({ _id: id }).exec();
    if (!cartItem) {
      throw new NotFoundException(`Cart Item #${id} not found`);
    }
    return cartItem;
  }

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    /*
    const { user_id } = createCartItemDto;
    try {
      await this.userModel.find({ isDeleted: false, _id: user_id });
    } catch {
      throw new NotFoundException(
        `Cannot add item to shopping cart, because user #${user_id} not found.`,
      );
    }
    */
    const cartItem = await this.cartItemModel.create({
      ...createCartItemDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return cartItem;
  }

  async update(id: string, updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
    const cartItem = await this.cartItemModel
      .findByIdAndUpdate(
        { _id: id },
        { $set: updateCartItemDto, $currentDate: { updatedAt: true } },
        { new: true },
      )
      .exec();
    if (!cartItem) {
      throw new NotFoundException(`Cart Item #${id} not found`);
    }
    return cartItem;
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.cartItemModel.findOneAndUpdate(
        { _id: id },
        { $set: { isDeleted: true }, $currentDate: { updatedAt: true } },
      );
      return true;
    } catch {
      return false;
    }
  }
}
