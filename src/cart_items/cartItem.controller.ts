import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CartItemService } from "./cartItem.service";
import { CreateCartItemDto } from "./dto/create-cartItem.dto";
import { FindCartItemListByAdminDto, FindAllCartItemDto } from "./dto/findAll-cartItem.dto";
import { UpdateCartItemDto } from "./dto/update-cartItem.dto";
import { CartItem } from "./schemas/cartItem.schema";
import { ObjectId } from "mongoose";
import { PaginationQueryDto } from "src/utils/PaginationDto/pagination-query.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("shopping-cart")
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}
  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Query() findAllCartItem: FindAllCartItemDto): Promise<CartItem[]> {
    return await this.cartItemService.findAll(findAllCartItem);
  }

  @Get("/admin")
  // TODO need header work on app-admin proj
  @UseGuards(AuthGuard)
  async findCartItemListByAdmin(
    @Query() findCartItemListByAdmin: PaginationQueryDto & FindCartItemListByAdminDto,
  ): Promise<{
    data: CartItem[];
    total: number;
  }> {
    return await this.cartItemService.findCartItemListByAdmin(findCartItemListByAdmin);
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  async findOne(@Param("id") id: ObjectId): Promise<CartItem> {
    return await this.cartItemService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    return await this.cartItemService.create(createCartItemDto);
  }

  @Put(":id")
  @UseGuards(AuthGuard)
  async update(
    @Param("id") id: ObjectId,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    return await this.cartItemService.update(id, updateCartItemDto);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  async remove(@Param("id") id: ObjectId): Promise<boolean> {
    return await this.cartItemService.remove(id);
  }
}
