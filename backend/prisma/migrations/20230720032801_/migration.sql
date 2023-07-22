/*
  Warnings:

  - Added the required column `tarea` to the `Tareas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tareas" ADD COLUMN     "tarea" TEXT NOT NULL;
