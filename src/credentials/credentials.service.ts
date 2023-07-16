import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { InitCredentialsDto } from './dto/init-credentials.dto';
import { User, Credential } from '@prisma/client';

@Injectable()
export class CredentialsService {
  constructor(private prisma: PrismaService) {}

  async initCredentials(user: User, initCredentialsDto: InitCredentialsDto) {
    try {
      const credentialGroup = await this.prisma.credentialGroup.create({
        data: {
          name: initCredentialsDto.credentialGroupName,
          ownerId: user.id,
        },
      });

      const credentials = initCredentialsDto.credentials.map(
        (c: Credential) => ({
          ...c,
          credentialGroupId: credentialGroup.id,
        }),
      );

      await this.prisma.credential.createMany({ data: credentials });
    } catch (error) {
      let message: string = 'Something went wrong.';
      if (error.code === 'P2002') {
        message = `"${initCredentialsDto.credentialGroupName}" group already exists.`;
      }
      throw new BadRequestException(message);
    }
  }
}
