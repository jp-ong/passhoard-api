import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { User, Credential } from '@prisma/client';
import { error } from 'console';

@Injectable()
export class CredentialsService {
  constructor(private prisma: PrismaService) {}

  async createCredentials(dto: CreateCredentialDto, user: User) {
    try {
      const exists = await this.prisma.credentialGroup.findUnique({
        where: { ownerId: user.id, id: dto.credentialGroupId },
      });

      if (!exists) return new BadRequestException().getResponse();

      const credentials = await this.prisma.credential.createMany({
        data: dto.credentials.map((c) => ({
          ...c,
          credentialGroupId: dto.credentialGroupId,
        })),
      });

      return credentials;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
