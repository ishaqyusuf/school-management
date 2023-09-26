/*
  Warnings:

  - You are about to drop the `classes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fees` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `studentterms` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `AcademicTerms` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `AcademicYears` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `AcademicYears` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `fees` DROP FOREIGN KEY `Fees_studentTermId_fkey`;

-- DropForeignKey
ALTER TABLE `studentterms` DROP FOREIGN KEY `StudentTerms_classId_fkey`;

-- DropForeignKey
ALTER TABLE `studentterms` DROP FOREIGN KEY `StudentTerms_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `studentterms` DROP FOREIGN KEY `StudentTerms_termId_fkey`;

-- AlterTable
ALTER TABLE `academicterms` ADD COLUMN `meta` JSON NULL;

-- AlterTable
ALTER TABLE `academicyears` ADD COLUMN `meta` JSON NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `parents` ADD COLUMN `meta` JSON NULL;

-- AlterTable
ALTER TABLE `students` ADD COLUMN `meta` JSON NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `meta` JSON NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `meta` JSON NULL;

-- AlterTable
ALTER TABLE `wallets` ADD COLUMN `meta` JSON NULL;

-- DropTable
DROP TABLE `classes`;

-- DropTable
DROP TABLE `fees`;

-- DropTable
DROP TABLE `studentterms`;

-- CreateTable
CREATE TABLE `ClassRoom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `academicYearsId` INTEGER NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `ClassRoom_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentTermSheets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `termId` INTEGER NOT NULL,
    `classId` INTEGER NOT NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `StudentTermSheets_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SchoolFeePayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `studentTermId` INTEGER NOT NULL,

    UNIQUE INDEX `SchoolFeePayment_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `AcademicTerms_slug_key` ON `AcademicTerms`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `AcademicYears_slug_key` ON `AcademicYears`(`slug`);

-- AddForeignKey
ALTER TABLE `ClassRoom` ADD CONSTRAINT `ClassRoom_academicYearsId_fkey` FOREIGN KEY (`academicYearsId`) REFERENCES `AcademicYears`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentTermSheets` ADD CONSTRAINT `StudentTermSheets_termId_fkey` FOREIGN KEY (`termId`) REFERENCES `AcademicTerms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentTermSheets` ADD CONSTRAINT `StudentTermSheets_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentTermSheets` ADD CONSTRAINT `StudentTermSheets_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `ClassRoom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SchoolFeePayment` ADD CONSTRAINT `SchoolFeePayment_studentTermId_fkey` FOREIGN KEY (`studentTermId`) REFERENCES `StudentTermSheets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
