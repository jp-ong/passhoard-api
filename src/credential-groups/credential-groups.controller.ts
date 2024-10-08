import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';

import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

import { CredentialGroupsService } from './credential-groups.service';
import { CreateCredentialGroupDto } from './dto/create-credential-group.dto';
import { UpdateCredentialGroupDto } from './dto/update-credential-group.dto';

@Controller('credential-groups')
export class CredentialGroupsController {
  constructor(
    private readonly credentialGroupService: CredentialGroupsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  getCredentialGroups(@Req() req: Request) {
    return this.credentialGroupService.getCredentialGroups(<User>req.user);
  }

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

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  updateCredentialGroup(
    @Req() req: Request,
    @Body() dto: UpdateCredentialGroupDto,
  ) {
    return this.credentialGroupService.updateCredentialGroup(
      dto,
      <User>req.user,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  deleteCredentialGroup(@Req() req: Request, @Param() params: any) {
    return this.credentialGroupService.deleteCredentialGroup(
      params.id,
      <User>req.user,
    );
  }
}
