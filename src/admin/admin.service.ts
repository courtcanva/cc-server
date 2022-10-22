import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { AdminDto } from "./dto/admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./schemas/admin.schema";
import { JwtService } from "@nestjs/jwt";
import { Tokens } from "./types";
import * as argon from "argon2";
import { PaginationQueryDto } from "src/utils/PaginationDto/pagination-query.dto";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    private jwtService: JwtService,
  ) {}

  async adminRegister(adminDto: AdminDto): Promise<Tokens> {
    const hashedPassword = await argon.hash(adminDto.password);

    const newAdminInfo = {
      ...adminDto,
      name: adminDto.name,
      email: adminDto.email,
      password: hashedPassword,
      permission: adminDto.permission,
    };

    const newAdmin = await this.adminModel.create(newAdminInfo);

    const tokens = await this.getTokens(newAdmin._id, newAdmin.email);

    await this.updateRtHash(newAdmin._id, tokens.refreshToken);
    return tokens;
  }

  async adminLogin(adminDto: AdminDto): Promise<Tokens> {
    const admin = await this.adminModel.findOne({ email: adminDto.email }).exec();
    if (!admin) {
      throw new ForbiddenException("Access Denied");
    }

    const passwordMatches = await argon.verify(admin.password, adminDto.password);
    if (!passwordMatches) {
      throw new ForbiddenException("Access Denied");
    }

    const tokens = await this.getTokens(admin._id, admin.email);
    await this.updateRtHash(admin._id, tokens.refreshToken);
    return tokens;
  }

  async adminLogout(adminId: ObjectId) {
    const admin = await this.adminModel.findById(adminId);
    admin.hashedRefreshToken &&
      (await this.adminModel.findByIdAndUpdate(adminId, { hashedRefreshToken: null }));
  }

  async refreshTokens(adminId: ObjectId, rt: string) {
    const admin = await this.adminModel.findById(adminId);
    if (!admin || !admin.hashedRefreshToken) {
      throw new ForbiddenException("Access Denied");
    }

    const rtMatches = await argon.verify(admin.hashedRefreshToken, rt);
    if (!rtMatches) {
      throw new ForbiddenException("Access Denied");
    }

    const tokens = await this.getTokens(admin._id, admin.email);
    await this.updateRtHash(admin._id, tokens.refreshToken);

    return tokens;
  }

  async getTokens(adminId: ObjectId, email: string) {
    const payload = {
      sub: adminId,
      email,
    };
    const atExp = {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: 60 * 15, //15 mins expiration
    };

    const rtExp = {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: 60 * 60 * 24 * 7, //one week expiration
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, atExp),
      this.jwtService.signAsync(payload, rtExp),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async updateRtHash(adminId: ObjectId, rt: string) {
    const hashedRefreshToken = await argon.hash(rt);
    const updateAdminDto = {
      ...AdminDto,
      hashedRefreshToken: hashedRefreshToken,
    };
    await this.adminModel
      .findByIdAndUpdate({ _id: adminId }, { $set: updateAdminDto }, { new: true })
      .exec();
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return await this.adminModel.find().sort({ createdAt: -1 }).skip(offset).limit(limit).exec();
  }

  async findOne(adminId: ObjectId): Promise<Admin> {
    const admin = await this.adminModel.findById(adminId).exec();
    if (!admin || admin.isDeleted) {
      throw new NotFoundException("Admin not found");
    }
    return admin;
  }

  async update(adminId: ObjectId, updateAdminDto): Promise<Admin> {
    const admin = await this.adminModel.findById(adminId).exec();
    if (!admin || admin.isDeleted) {
      throw new NotFoundException("Admin not found");
    }
    updateAdminDto = { ...updateAdminDto, updatedAt: new Date() };
    const updatedAdmin = await this.adminModel
      .findByIdAndUpdate(adminId, { $set: updateAdminDto }, { new: true })
      .exec();

    return updatedAdmin;
  }

  async remove(adminId: ObjectId): Promise<boolean> {
    const admin = await this.adminModel.findById(adminId).exec();

    if (!admin || admin.isDeleted) {
      throw new NotFoundException("Admin not found");
    }
    await this.adminModel.findByIdAndUpdate(adminId, {
      isDeleted: true,
      updatedAt: new Date(),
    });
    return true;
  }

  async restore(adminId: ObjectId): Promise<boolean> {
    const admin = await this.adminModel.findById(adminId).exec();

    if (!admin || !admin.isDeleted) {
      throw new NotFoundException("Not a deleted admin");
    }
    await this.adminModel.findByIdAndUpdate(adminId, {
      isDeleted: false,
      updatedAt: new Date(),
    });
    return true;
  }
}
