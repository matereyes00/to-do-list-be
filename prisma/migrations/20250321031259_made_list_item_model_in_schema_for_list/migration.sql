-- CreateTable
CREATE TABLE "ListItem" (
    "itemId" SERIAL NOT NULL,
    "itemTitle" TEXT NOT NULL,
    "itemStatus" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "listId" INTEGER NOT NULL,

    CONSTRAINT "ListItem_pkey" PRIMARY KEY ("itemId")
);

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
