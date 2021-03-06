import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import { UserDtos, loginDtos } from '../dtos/user.dtos';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from '../model/token.model';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private mailservice: MailService,
  ) {}

  // Create a new user
  async createNewUser(user: UserDtos): Promise<any> {
    const userDb = await this.userModel.findOne({ email: user.email });
    if (userDb) {
      throw new HttpException(
        {
          status: 409,
          error: 'User already exists',
        },
        409,
      );
    }
    const passwordEncript = await bcrypt.hash(user.password, 10);
    user.password = passwordEncript;
    const createdUser = new this.userModel(user);
    const model = await createdUser.save();
    const { password, ...resp } = model.toJSON();
    const token = await this.jwtService.sign({
      email: model.email,
      sub: model._id,
    });
    this.mailservice.sendConfirmationEmail({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      url: `http://localhost:8080/auth/confirm/${token}`,
    });
    return resp;
  }

  // Login de usuario
  async loginUser(user: loginDtos): Promise<any> {
    const userDb = await this.userModel.findOne({ email: user.email });
    if (!userDb) {
      throw new HttpException(
        {
          status: 401,
          error: 'User not found',
        },
        401,
      );
    }

    const passwordIsValid = await bcrypt.compare(
      user.password,
      userDb.password,
    );
    if (!passwordIsValid) {
      throw new HttpException(
        {
          status: 401,
          error: 'Invalid password',
        },
        401,
      );
    }
    if (!userDb.isActive) {
      throw new HttpException(
        {
          status: 401,
          active: true,
          error: 'User not active',
        },
        401,
      );
    }
    const { password, ...resp } = userDb.toJSON();
    const token = await this.generateToken(userDb);
    return {
      user: resp,
      ...token,
    };
  }

  // Generar token
  async generateToken(user: User): Promise<any> {
    const payload: PayloadToken = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Confirmar usuario
  async confirmUser(token: PayloadToken): Promise<any> {
    const user = await this.userModel.findOne({ _id: token.sub });
    if (!user) {
      throw new HttpException(
        {
          status: 401,
          error: 'User not found',
        },
        401,
      );
    }
    user.isActive = true;
    await user.save();
    return {
      status: 200,
      message: 'User confirmed',
    };
  }
}
