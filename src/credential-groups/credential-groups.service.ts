import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCredentialGroupDto } from './dto/create-credential-group.dto';
import { UpdateCredentialGroupDto } from './dto/update-credential-group.dto';

@Injectable()
export class CredentialGroupsService {
  constructor(private prisma: PrismaService) {}

  async getCredentialGroups(user: User) {
    try {
      const credentialGroups = await this.prisma.credentialGroup.findMany({
        where: { ownerId: user.id },
        orderBy: { name: 'asc' },
      });
      return credentialGroups;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

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

  async deleteCredentialGroup(id: string, user: User) {
    try {
      await this.prisma.credential.deleteMany({
        where: { credentialGroupId: id, ownerId: user.id },
      });
      await this.prisma.credentialGroup.delete({
        where: { id, ownerId: user.id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return;
        }
      }
      throw new InternalServerErrorException();
    }
  }
}
