import { Credential } from '@prisma/client';

export class InitCredentialsDto {
  credentialGroupName: string;
  credentials: Credential[];
}
