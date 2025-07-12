-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `usuarios_majorId_fkey`;

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `majorId` CHAR(40) NULL;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `majors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
