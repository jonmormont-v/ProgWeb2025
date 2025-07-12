/*
  Warnings:

  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - Made the column `majorId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_majorId_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `created_at`,
    DROP COLUMN `isAdmin`,
    DROP COLUMN `updated_at`,
    MODIFY `majorId` CHAR(40) NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `majors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
