/*
  Warnings:

  - Added the required column `listUserId` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_id_fkey";

-- AlterTable
ALTER TABLE "List" ADD COLUMN     "listUserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_listUserId_fkey" FOREIGN KEY ("listUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
