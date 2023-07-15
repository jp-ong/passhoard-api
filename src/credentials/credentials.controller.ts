import { Controller, Get, Param, Post } from '@nestjs/common';

import { CredentialsService } from './credentials.service';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Get(':ownerId')
  getOwnerCredentials(@Param() params: any) {
    return this.credentialsService.getOwnerCredentials(params.ownerId);
  }

  @Post()
  createCredential() {
    return this.credentialsService.createCredential();
  }
}
