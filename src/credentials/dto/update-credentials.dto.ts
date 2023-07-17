import { Credential } from '@prisma/client';

export class UpdateCredentialsDto {
  credentials: Credential[];
}
