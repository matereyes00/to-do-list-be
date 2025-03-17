/*
  Warnings:

  - You are about to drop the column `itemsInList` on the `List` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "List" DROP COLUMN "itemsInList";

-- CreateTable
CREATE TABLE "ListItem" (
    "itemId" SERIAL NOT NULL,
    "itemTitle" TEXT NOT NULL,
    "itemStatus" BOOLEAN NOT NULL,

    CONSTRAINT "ListItem_pkey" PRIMARY KEY ("itemId")
);

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
