/*
  Warnings:

  - You are about to drop the column `firstName` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `students` table. All the data in the column will be lost.
  - Added the required column `name` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `students` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
