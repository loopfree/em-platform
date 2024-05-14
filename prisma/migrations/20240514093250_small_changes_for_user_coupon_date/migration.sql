/*
  Warnings:

  - You are about to drop the column `join_date` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `join_date`,
    ADD COLUMN `expired_date` DATETIME(3) NULL;
