import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { CredentialsService } from './credentials.service';
import { InitCredentialsDto } from './dto/init-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post('init')
  @HttpCode(201)
  @UseGuards(AuthGuard('jwt'))
  initCredentials(
    @Req() req: Request,
    @Body() initCredentialsDto: InitCredentialsDto,
  ) {
    return this.credentialsService.initCredentials(
      <User>req.user,
      initCredentialsDto,
    );
  }
}
