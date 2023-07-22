/*
  Warnings:

  - You are about to drop the column `user_id` on the `Tareas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tareas" DROP CONSTRAINT "Tareas_user_id_fkey";

-- AlterTable
ALTER TABLE "Tareas" DROP COLUMN "user_id";
