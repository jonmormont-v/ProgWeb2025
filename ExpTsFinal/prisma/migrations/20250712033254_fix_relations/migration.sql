/*
  Warnings:

  - You are about to drop the column `endedAt` on the `gamesessions` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `gamesessions` table. All the data in the column will be lost.
  - You are about to drop the `Major` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `gamesessions` DROP FOREIGN KEY `gamesessions_majorId_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `usuarios_majorId_fkey`;

-- AlterTable
ALTER TABLE `gamesessions` DROP COLUMN `endedAt`,
    DROP COLUMN `startedAt`,
    ADD COLUMN `ended_at` DATETIME(3) NULL,
    ADD COLUMN `started_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `Major`;

-- CreateTable
CREATE TABLE `majors` (
    `id` CHAR(40) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `code` CHAR(4) NOT NULL,
    `description` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `majors_name_key`(`name`),
    UNIQUE INDEX `majors_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `majors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gamesessions` ADD CONSTRAINT `gamesessions_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `majors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
