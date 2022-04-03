import { Module } from '@nestjs/common';
import { JwtStrategy } from './statrategy/jwt.strategy';

@Module({
  providers: [JwtStrategy],
})
export class AuthModule {}
