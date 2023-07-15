import { Module } from '@nestjs/common';

import { CredentialGroupsService } from './credential-groups.service';
import { CredentialGroupsController } from './credential-groups.controller';

@Module({
  controllers: [CredentialGroupsController],
  providers: [CredentialGroupsService],
})
export class CredentialGroupsModule {}
