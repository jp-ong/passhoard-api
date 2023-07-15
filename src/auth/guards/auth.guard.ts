import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private prisma: PrismaService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization;
    if (!authorization) return false;

    const token = authorization.split(' ')[1];
    if (!token) return false;

    let verified: boolean;

    try {
      this.jwt.verify(token, {
        secret: this.config.get('JWT_SECRET'),
      });
      verified = true;
    } catch (error) {
      verified = false;
    }

    return true;
  }
}
