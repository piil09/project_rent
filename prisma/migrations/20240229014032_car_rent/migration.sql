/*
  Warnings:

  - The primary key for the `admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `admin` table. All the data in the column will be lost.
  - Added the required column `adminID` to the `admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` DROP PRIMARY KEY,
    DROP COLUMN `ID`,
    ADD COLUMN `adminID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`adminID`);

-- AlterTable
ALTER TABLE `car` MODIFY `Nopol` VARCHAR(191) NOT NULL DEFAULT '';
