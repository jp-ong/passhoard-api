import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCredentialGroupDto } from './create-credential-group.dto';
import { User } from '@prisma/client';

@Injectable()
export class CredentialGroupsService {
  constructor(private prisma: PrismaService) {}

  async createCredentialGroup(
    createCredentialGroupDto: CreateCredentialGroupDto,
    user: User,
  ) {
    const credentialGroup = await this.prisma.credentialGroup.create({
      data: {
        name: createCredentialGroupDto.name,
        ownerId: user.id,
      },
    });
    return credentialGroup;
  }
}
