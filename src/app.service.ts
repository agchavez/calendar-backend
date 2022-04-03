import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configModule: ConfigService) {}
  getHello(): string {
    return this.configModule.get('APP_NAME');
  }
}
