/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Credential` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Credential" DROP CONSTRAINT "Credential_ownerId_fkey";

-- AlterTable
ALTER TABLE "Credential" DROP COLUMN "ownerId";
