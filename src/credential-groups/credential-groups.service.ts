import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCredentialGroupDto } from './create-credential-group.dto';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
}
