/*
  Warnings:

  - A unique constraint covering the columns `[verifierId]` on the table `UserW3A` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `verifierId` to the `UserW3A` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserW3A" ADD COLUMN     "verifierId" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserW3A_verifierId_key" ON "UserW3A"("verifierId");
