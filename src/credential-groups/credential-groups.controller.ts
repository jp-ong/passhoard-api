import { Controller, Get, Post } from '@nestjs/common';
import { CredentialGroupsService } from './credential-groups.service';

@Controller('credential-groups')
export class CredentialGroupsController {
  constructor(
    private readonly credentialGroupService: CredentialGroupsService,
  ) {}

  @Post()
  createCredentialGroup() {
    return this.credentialGroupService.createCredentialGroup();
  }

  @Get()
  getCredentialGroups() {
    return this.credentialGroupService.getCredentialGroups();
  }
}
