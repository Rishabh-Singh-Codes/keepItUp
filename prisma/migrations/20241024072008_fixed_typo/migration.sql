/*
  Warnings:

  - You are about to drop the column `profilePicutre` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilePicutre",
ADD COLUMN     "profilePicture" TEXT NOT NULL DEFAULT '';
