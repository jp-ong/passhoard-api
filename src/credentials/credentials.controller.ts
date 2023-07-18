import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Req,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

import { CredentialsService } from './credentials.service';
import { CreateCredentialsDto } from './dto/create-credentials.dto';
import { UpdateCredentialsDto } from './dto/update-credentials.dto';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Get(':credentialGroupId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  getCredentials(@Req() req: Request, @Param() params: any) {
    return this.credentialsService.getCredentials(
      params.credentialGroupId,
      <User>req.user,
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  createCredentials(@Req() req: Request, @Body() dto: CreateCredentialsDto) {
    return this.credentialsService.createCredentials(dto, <User>req.user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  deleteCredential(@Param() params: any) {
    return this.credentialsService.deleteCredential(params.id);
  }

  @Put('')
  @UseGuards(AuthGuard('jwt'))
  updateCredentials(@Req() req: Request, @Body() dto: UpdateCredentialsDto) {
    return this.credentialsService.updateCredentials(dto, <User>req.user);
  }
}
