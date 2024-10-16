-- CreateTable
CREATE TABLE "Saakhi" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "guruJiId" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,

    CONSTRAINT "Saakhi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuruJi" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GuruJi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Saakhi_sequence_key" ON "Saakhi"("sequence");

-- CreateIndex
CREATE UNIQUE INDEX "GuruJi_order_key" ON "GuruJi"("order");

-- CreateIndex
CREATE UNIQUE INDEX "GuruJi_name_key" ON "GuruJi"("name");

-- AddForeignKey
ALTER TABLE "Saakhi" ADD CONSTRAINT "Saakhi_guruJiId_fkey" FOREIGN KEY ("guruJiId") REFERENCES "GuruJi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
