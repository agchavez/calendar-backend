import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from '../model/token.model';

@Injectable()
export class TokenConfirmPipe implements PipeTransform {
  constructor(private jwtService: JwtService) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const token = this.jwtService.decode(value) as PayloadToken;
    if (!token) {
      throw new HttpException('Invalid token', 401);
    }
    return token;
  }
}
