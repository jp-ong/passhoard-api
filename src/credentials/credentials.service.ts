import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCredentialsDto } from './dto/create-credentials.dto';
import { User, Credential } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdateCredentialsDto } from './dto/update-credentials.dto';

@Injectable()
export class CredentialsService {
  constructor(private prisma: PrismaService) {}

  async createCredentials(dto: CreateCredentialsDto, user: User) {
    try {
      const exists = await this.prisma.credentialGroup.findUnique({
        where: { ownerId: user.id, id: dto.credentialGroupId },
      });

      if (!exists) return new BadRequestException().getResponse();

      const newCredentials: Credential[] = dto.credentials.map((c) => ({
        ...c,
        credentialGroupId: dto.credentialGroupId,
        ownerId: user.id,
      }));

      const credentials = await this.prisma.credential.createMany({
        data: newCredentials,
      });

      return credentials;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteCredential(id: string) {
    try {
      await this.prisma.credential.delete({ where: { id } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return;
        }
      }
      throw new InternalServerErrorException();
    }
  }

  async updateCredentials(dto: UpdateCredentialsDto, user: User) {
    console.log(user.id);
    try {
      await Promise.all(
        dto.credentials.map(async (c) => {
          await this.prisma.credential.update({
            where: { id: c.id, ownerId: user.id },
            data: { identifier: c.identifier, password: c.password },
          });
        }),
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
