/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Project_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_userId_key" ON "Project"("name", "userId");
