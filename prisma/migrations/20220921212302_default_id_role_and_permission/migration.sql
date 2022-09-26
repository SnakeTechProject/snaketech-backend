-- AlterTable
CREATE SEQUENCE "permission_id_seq";
ALTER TABLE "permission" ALTER COLUMN "id" SET DEFAULT nextval('permission_id_seq');
ALTER SEQUENCE "permission_id_seq" OWNED BY "permission"."id";

-- AlterTable
CREATE SEQUENCE "role_id_seq";
ALTER TABLE "role" ALTER COLUMN "id" SET DEFAULT nextval('role_id_seq');
ALTER SEQUENCE "role_id_seq" OWNED BY "role"."id";
