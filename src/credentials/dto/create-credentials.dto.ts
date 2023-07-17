import { Credential } from '@prisma/client';

export class CreateCredentialsDto {
  credentialGroupId: string;
  credentials: Credential[];
}
