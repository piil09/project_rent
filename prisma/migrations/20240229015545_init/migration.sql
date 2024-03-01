/*
  Warnings:

  - You are about to drop the column `bookData` on the `rent` table. All the data in the column will be lost.
  - You are about to alter the column `lamaSewa` on the `rent` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `rent` DROP COLUMN `bookData`,
    ADD COLUMN `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `lamaSewa` INTEGER NOT NULL DEFAULT 0;
