import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserRole } from 'src/app/user/entities/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('admin guard', user);
    if (!user || user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
