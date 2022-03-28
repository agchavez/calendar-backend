import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserDtos, loginDtos } from '../dtos/user.dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async login(@Body() user: UserDtos) {
    return this.authService.createNewUser(user);
  }

  @Post('login')
  async loginUser(@Body() user: loginDtos) {
    return this.authService.loginUser(user);
  }
}
