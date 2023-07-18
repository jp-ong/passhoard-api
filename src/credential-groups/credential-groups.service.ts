import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCredentialGroupDto } from './create-credential-group.dto';
import { UpdateCredentialGroupDto } from './dto/update-credential-group.dto';

@Injectable()
export class CredentialGroupsService {
  constructor(private prisma: PrismaService) {}

  async createCredentialGroup(dto: CreateCredentialGroupDto, user: User) {
    try {
      const credentialGroup = await this.prisma.credentialGroup.create({
        data: {
          name: dto.name,
          ownerId: user.id,
        },
      });
      return credentialGroup;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException();
        }
      }
      throw new InternalServerErrorException();
    }
  }

  async updateCredentialGroup(dto: UpdateCredentialGroupDto, user: User) {
    try {
      const credentialGroup = await this.prisma.credentialGroup.update({
        where: { id: dto.id, ownerId: user.id },
        data: { name: dto.name },
      });
      return credentialGroup;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException();
        }
      }
      throw new InternalServerErrorException();
    }
  }
}
