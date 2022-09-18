import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CartItem } from "./schemas/cartItem.schema";
import { CreateCartItemDto } from "./dto/create-cartItem.dto";
import { UpdateCartItemDto } from "./dto/update-cartItem.dto";
import { FindAllCartItemDto } from "./dto/findAll-cartItem.dto";
import { User } from "../users/schemas/user.schema";
import { ObjectId } from "mongoose";

@Injectable()
export class CartItemService {
  constructor(
    @InjectModel(CartItem.name) private readonly cartItemModel: Model<CartItem>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(findAllCartItem: FindAllCartItemDto): Promise<CartItem[]> {
    const { user_id, limit = 0, offset = 0 } = findAllCartItem;
    if (user_id === "") {
      throw new NotFoundException("userId cannot be empty string");
    }
    const optionalQuery: { [key: string]: any } = {};
    if (user_id) optionalQuery.user_id = user_id;

    return await this.cartItemModel
      .find({ isDeleted: false, ...optionalQuery })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
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

  async update(id: ObjectId, updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
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

  async remove(id: ObjectId): Promise<boolean> {
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
