-- AlterTable
ALTER TABLE `manager` ADD COLUMN `subadminId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Manager` ADD CONSTRAINT `Manager_subadminId_fkey` FOREIGN KEY (`subadminId`) REFERENCES `Subadmin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
