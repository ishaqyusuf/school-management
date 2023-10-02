/*
  Warnings:

  - You are about to drop the column `slug` on the `academicterms` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `academicyears` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `assessments` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `classroom` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `studenttermsheets` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `subjects` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `AcademicTerms_slug_key` ON `academicterms`;

-- DropIndex
DROP INDEX `AcademicYears_slug_key` ON `academicyears`;

-- AlterTable
ALTER TABLE `academicterms` DROP COLUMN `slug`;

-- AlterTable
ALTER TABLE `academicyears` DROP COLUMN `slug`;

-- AlterTable
ALTER TABLE `assessments` DROP COLUMN `slug`;

-- AlterTable
ALTER TABLE `classroom` DROP COLUMN `slug`;

-- AlterTable
ALTER TABLE `students` DROP COLUMN `slug`;

-- AlterTable
ALTER TABLE `studenttermsheets` DROP COLUMN `slug`;

-- AlterTable
ALTER TABLE `subjects` DROP COLUMN `slug`;
