import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CredentialGroupsService {
  constructor(private prisma: PrismaService) {}

  async createCredentialGroup() {
    const credentialGroup = await this.prisma.credentialGroup.create({
      data: {
        name: 'GitHub',
        ownerId: 'ef6ec0d3-742e-40c4-b42f-ca6af11d6b73',
      },
    });
    return credentialGroup;
  }

  async getCredentialGroups() {
    const credentialGroups = await this.prisma.credentialGroup.findMany();

    return credentialGroups;
  }
}
