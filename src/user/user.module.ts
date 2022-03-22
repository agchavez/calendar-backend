import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './services/user.controller';
import { AuthController } from './services/auth.controller';

@Module({
  controllers: [UserController, AuthController],
})
export class UserModule {}
