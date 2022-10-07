/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `challenge` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "challenge_slug_key" ON "challenge"("slug");
