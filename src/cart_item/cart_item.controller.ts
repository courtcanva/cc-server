import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CartItemService } from "./cart_item.service";
import { CreateCartItemDto } from "./dto/create-cart_item.dto";
import { FindAllCartItemDto } from "./dto/findAll-cart_item.dto";
import { UpdateCartItemDto } from "./dto/update-cart_item.dto";
import { CartItem } from "./schemas/cart_item.schema";

@Controller("shopping-cart")
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}
  @Get()
  async findAll(@Query() findAllCartItem: FindAllCartItemDto): Promise<CartItem[]> {
    return await this.cartItemService.findAll(findAllCartItem);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<CartItem> {
    return await this.cartItemService.findOne(id);
  }

  @Post()
  async create(@Body() createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    return await this.cartItemService.create(createCartItemDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    return await this.cartItemService.update(id, updateCartItemDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<boolean> {
    return await this.cartItemService.remove(id);
  }
}
