-- AlterTable
ALTER TABLE `academicterms` ADD COLUMN `current` BOOLEAN NULL,
    ADD COLUMN `endsAt` TIMESTAMP(0) NULL,
    ADD COLUMN `startedAt` TIMESTAMP(0) NULL;
