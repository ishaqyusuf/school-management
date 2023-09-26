/*
  Warnings:

  - Added the required column `slug` to the `ClassRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `StudentTermSheets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academicTermsId` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academicYearsId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `classroom` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `students` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `studenttermsheets` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `academicTermsId` INTEGER NOT NULL,
    ADD COLUMN `academicYearsId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Subjects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `academicTermsId` INTEGER NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `classRoomId` INTEGER NULL,

    UNIQUE INDEX `Subjects_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Assessments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `classRoomId` INTEGER NOT NULL,
    `subjectsId` INTEGER NOT NULL,
    `obtainable` INTEGER NOT NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Assessments_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssessmentResults` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assessmentsId` INTEGER NOT NULL,
    `subjectsId` INTEGER NOT NULL,
    `studentsId` INTEGER NOT NULL,
    `academicTermsId` INTEGER NOT NULL,
    `studentTermSheetsId` INTEGER NOT NULL,

    UNIQUE INDEX `AssessmentResults_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subjects` ADD CONSTRAINT `Subjects_classRoomId_fkey` FOREIGN KEY (`classRoomId`) REFERENCES `ClassRoom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subjects` ADD CONSTRAINT `Subjects_academicTermsId_fkey` FOREIGN KEY (`academicTermsId`) REFERENCES `AcademicTerms`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assessments` ADD CONSTRAINT `Assessments_classRoomId_fkey` FOREIGN KEY (`classRoomId`) REFERENCES `ClassRoom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assessments` ADD CONSTRAINT `Assessments_subjectsId_fkey` FOREIGN KEY (`subjectsId`) REFERENCES `Subjects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentResults` ADD CONSTRAINT `AssessmentResults_assessmentsId_fkey` FOREIGN KEY (`assessmentsId`) REFERENCES `Assessments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentResults` ADD CONSTRAINT `AssessmentResults_subjectsId_fkey` FOREIGN KEY (`subjectsId`) REFERENCES `Subjects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentResults` ADD CONSTRAINT `AssessmentResults_studentsId_fkey` FOREIGN KEY (`studentsId`) REFERENCES `Students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentResults` ADD CONSTRAINT `AssessmentResults_academicTermsId_fkey` FOREIGN KEY (`academicTermsId`) REFERENCES `AcademicTerms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentResults` ADD CONSTRAINT `AssessmentResults_studentTermSheetsId_fkey` FOREIGN KEY (`studentTermSheetsId`) REFERENCES `StudentTermSheets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_academicYearsId_fkey` FOREIGN KEY (`academicYearsId`) REFERENCES `AcademicYears`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_academicTermsId_fkey` FOREIGN KEY (`academicTermsId`) REFERENCES `AcademicTerms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
