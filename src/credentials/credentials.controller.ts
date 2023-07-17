import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard('jwt'))
  createCredentials(@Req() req: Request, @Body() dto: CreateCredentialDto) {
    return this.credentialsService.createCredentials(dto, <User>req.user);
  }
}
