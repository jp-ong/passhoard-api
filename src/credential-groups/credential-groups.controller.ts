import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { CredentialGroupsService } from './credential-groups.service';
import { CreateCredentialGroupDto } from './create-credential-group.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('credential-groups')
export class CredentialGroupsController {
  constructor(
    private readonly credentialGroupService: CredentialGroupsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  createCredentialGroup(
    @Req() req: Request,
    @Body() dto: CreateCredentialGroupDto,
  ) {
    return this.credentialGroupService.createCredentialGroup(
      dto,
      <User>req.user,
    );
  }
}
