import { Credential } from '@prisma/client';

export class CreateCredentialDto {
  credentialGroupId: string;
  credentials: Credential[];
}
