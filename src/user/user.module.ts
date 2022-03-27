import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserController, AuthController],
  providers: [AuthService, UserService],
})
export class UserModule {}
