import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CredentialsService {
  constructor(private prisma: PrismaService) {}

  async createCredential() {
    const credential = this.prisma.credential.create({
      data: {
        identifier: 'japlong',
        password: '1234',
        ownerId: 'ef6ec0d3-742e-40c4-b42f-ca6af11d6b73',
        credentialGroupId: '27607d15-cfed-4e55-9445-4f0d35766934',
      },
    });

    return credential;
  }

  async getOwnerCredentials(ownerId: string) {
    const credentials = this.prisma.credential.findMany({ where: { ownerId } });
    return credentials;
  }
}
