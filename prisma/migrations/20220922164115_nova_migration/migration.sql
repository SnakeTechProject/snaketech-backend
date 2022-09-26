-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_parent_id_fkey";

-- AlterTable
ALTER TABLE "comment" ALTER COLUMN "parent_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
