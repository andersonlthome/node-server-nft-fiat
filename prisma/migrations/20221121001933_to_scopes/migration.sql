/*
  Warnings:

  - You are about to drop the column `scope` on the `UserW3A` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserW3A" DROP COLUMN "scope",
ADD COLUMN     "scopes" TEXT[];
