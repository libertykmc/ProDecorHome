import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UserRole } from './app/user/entities/user.entity';
import { stringify } from 'querystring';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      role: UserRole;
    } | null;
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req);
    if (token) {
      try {
        const payload = await this.jwtService.verifyAsync<{
          login: string;
          role: UserRole;
        }>(token);
        console.log(payload);
        req.user = {
          id: payload.login,
          role: payload.role,
        };
      } catch {
        req.user = null;
        console.log('error');
      }
    } else {
      req.user = null;
    }
    next();
  }
  private extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
