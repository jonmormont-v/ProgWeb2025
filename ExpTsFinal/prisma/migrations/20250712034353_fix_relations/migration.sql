/*
  Warnings:

  - The primary key for the `gamesessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `gamesessions` table. The data in that column could be lost. The data in that column will be cast from `Char(40)` to `Char(36)`.
  - You are about to alter the column `userId` on the `gamesessions` table. The data in that column could be lost. The data in that column will be cast from `Char(40)` to `Char(36)`.
  - You are about to alter the column `majorId` on the `gamesessions` table. The data in that column could be lost. The data in that column will be cast from `Char(40)` to `Char(36)`.
  - The primary key for the `majors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `majors` table. The data in that column could be lost. The data in that column will be cast from `Char(40)` to `Char(36)`.
  - The primary key for the `usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `Char(40)` to `Char(36)`.
  - You are about to alter the column `majorId` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `Char(40)` to `Char(36)`.

*/
-- DropForeignKey
ALTER TABLE `gamesessions` DROP FOREIGN KEY `gamesessions_majorId_fkey`;

-- DropForeignKey
ALTER TABLE `gamesessions` DROP FOREIGN KEY `gamesessions_userId_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `usuarios_majorId_fkey`;

-- AlterTable
ALTER TABLE `gamesessions` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    MODIFY `userId` CHAR(36) NOT NULL,
    MODIFY `majorId` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `majors` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    MODIFY `description` TEXT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `usuarios` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    MODIFY `majorId` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `majors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gamesessions` ADD CONSTRAINT `gamesessions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gamesessions` ADD CONSTRAINT `gamesessions_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `majors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
