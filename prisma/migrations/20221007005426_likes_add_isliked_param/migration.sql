/*
  Warnings:

  - Added the required column `is_liked` to the `like` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "like" ADD COLUMN     "is_liked" BOOLEAN NOT NULL;
