import { Controller, Body, Post, Param, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserDtos, loginDtos } from '../dtos/user.dtos';
import { TokenConfirmPipe } from '../pipes/token-confirm.pipe';
import { PayloadToken } from '../model/token.model';

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

  @Get('confirm/:token')
  async confirmUser(@Param('token', TokenConfirmPipe) token: PayloadToken) {
    return this.authService.confirmUser(token);
  }
}
