/*
  Warnings:

  - You are about to drop the column `name` on the `students` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `students` DROP COLUMN `name`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NULL;
