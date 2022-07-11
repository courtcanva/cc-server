import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { AdminDto } from "./dto/admin.dto";
import { Admin } from "./schemas/admin.schema";
import { JwtService } from "@nestjs/jwt";
import { Tokens } from "./types";
import * as argon from "argon2";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    private jwtService: JwtService,
  ) {}

  /**
   * Register an admin
   * @param adminDto Admin information including email and password
   * @returns {Tokens} including accessToken and refreshToken
   */
  async adminRegister(adminDto: AdminDto): Promise<Tokens> {
    const hashedPassword = await argon.hash(adminDto.password);

    const newAdminInfo = {
      ...adminDto,
      email: adminDto.email,
      password: hashedPassword,
    };

    const newAdmin = await this.adminModel.create(newAdminInfo);

    const tokens = await this.getTokens(newAdmin._id, newAdmin.email);

    await this.updateRtHash(newAdmin._id, tokens.refreshToken);
    return tokens;
  }

  /**
   *Login with an admin account
   * @param adminDto Admin information including email and password
   * @returns
   */
  async adminLogin(adminDto: AdminDto): Promise<Tokens> {
    const admin = await this.adminModel.findOne({ email: adminDto.email }).exec();
    if (!admin) throw new ForbiddenException("Access Denied");

    const passwordMatches = await argon.verify(admin.password, adminDto.password);
    if (!passwordMatches) throw new ForbiddenException("Access Denied");

    const tokens = await this.getTokens(admin._id, admin.email);
    await this.updateRtHash(admin._id, tokens.refreshToken);
    return tokens;
  }

  /**
   * Log out user and make his refresh token as null in the database
   * @param adminId admin id
   */
  async adminLogout(adminId: ObjectId) {
    const admin = await this.adminModel.findById(adminId);
    admin.hashedRefreshToken &&
      (await this.adminModel.findByIdAndUpdate(adminId, { hashedRefreshToken: null }));
  }

  /**
   * Return new token pairs
   * @param adminId admin id
   * @param rt refresh token in the request
   * @returns {Tokens}
   */
  async refreshTokens(adminId: ObjectId, rt: string) {
    const admin = await this.adminModel.findById(adminId);
    if (!admin || !admin.hashedRefreshToken) throw new ForbiddenException("Access Denied");

    const rtMatches = await argon.verify(admin.hashedRefreshToken, rt);
    if (!rtMatches) throw new ForbiddenException("Access Denied");

    const tokens = await this.getTokens(admin._id, admin.email);
    await this.updateRtHash(admin._id, tokens.refreshToken);

    return tokens;
  }

  /**
   *  Generate access token and refresh token
   * @param adminId admin id
   * @param email admin email
   * @returns {Tokens}
   */
  async getTokens(adminId: ObjectId, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: adminId,
          email,
        },
        {
          // TODO: put secret into environment variable
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: 60 * 15, //15 mins expiration
        },
      ),
      this.jwtService.signAsync(
        {
          sub: adminId,
          email,
        },
        {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: 60 * 60 * 24 * 7, //one week expiration
        },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  /**
   * Update admin account's refresh token
   * @param adminId admin id
   * @param rt refresh token
   */
  async updateRtHash(adminId: ObjectId, rt: string) {
    const hashedRefreshToken = await argon.hash(rt);
    const updateAdminDto = {
      ...AdminDto,
      hashedRefreshToken: hashedRefreshToken,
      updatedAt: new Date(),
    };
    await this.adminModel
      .findByIdAndUpdate({ _id: adminId }, { $set: updateAdminDto }, { new: true })
      .exec();
  }
}
