import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: registerDto.password,
      },
    });

    const token = this.signToken({ id: user.id, email: user.email });
    return token;
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    const token = this.signToken({ id: user.id, email: user.email });
    return token;
  }

  async signToken(payload: { id: string; email: string }): Promise<string> {
    const token = await this.jwt.signAsync(
      { id: payload.id, email: payload.email },
      { expiresIn: '1h', secret: this.config.get('JWT_SECRET') },
    );
    return token;
  }
}
