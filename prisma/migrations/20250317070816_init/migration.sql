-- CreateTable
CREATE TABLE "List" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "itemsInList" TEXT[],
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);
