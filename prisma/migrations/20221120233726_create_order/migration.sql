-- AlterTable
ALTER TABLE "UserW3A" ADD COLUMN     "scope" TEXT[],
ADD COLUMN     "wallet" TEXT;

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "orderStatus" TEXT NOT NULL,
    "orderType" TEXT NOT NULL,
    "orderFiatAmount" DOUBLE PRECISION NOT NULL,
    "orderFiatCurrency" TEXT NOT NULL,
    "orderCryptoAmount" DOUBLE PRECISION NOT NULL,
    "orderCryptoCurrency" TEXT NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderId_key" ON "Order"("orderId");
