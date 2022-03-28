import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';

@Module({
  controllers: [UserController, AuthController],
  providers: [AuthService, UserService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
})
export class UserModule {}
