import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class TokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const auth = request.header('Authorization');
    if (!auth) {
      throw new UnauthorizedException('Authorization is required');
    } else if (auth.split(' ')[0] !== 'token') {
      throw new UnauthorizedException('Token is required');
    }

    return true;
  }
}
