/*
  Warnings:

  - Made the column `academicYearsId` on table `classroom` required. This step will fail if there are existing NULL values in that column.
  - Made the column `academicTermsId` on table `subjects` required. This step will fail if there are existing NULL values in that column.
  - Made the column `classRoomId` on table `subjects` required. This step will fail if there are existing NULL values in that column.
  - Made the column `usersId` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `classroom` DROP FOREIGN KEY `ClassRoom_academicYearsId_fkey`;

-- DropForeignKey
ALTER TABLE `subjects` DROP FOREIGN KEY `Subjects_academicTermsId_fkey`;

-- DropForeignKey
ALTER TABLE `subjects` DROP FOREIGN KEY `Subjects_classRoomId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_usersId_fkey`;

-- AlterTable
ALTER TABLE `classroom` MODIFY `academicYearsId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `subjects` MODIFY `academicTermsId` INTEGER NOT NULL,
    MODIFY `classRoomId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transactions` MODIFY `usersId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ClassRoom` ADD CONSTRAINT `ClassRoom_academicYearsId_fkey` FOREIGN KEY (`academicYearsId`) REFERENCES `AcademicYears`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subjects` ADD CONSTRAINT `Subjects_classRoomId_fkey` FOREIGN KEY (`classRoomId`) REFERENCES `ClassRoom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subjects` ADD CONSTRAINT `Subjects_academicTermsId_fkey` FOREIGN KEY (`academicTermsId`) REFERENCES `AcademicTerms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
