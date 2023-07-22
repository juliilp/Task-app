-- CreateTable
CREATE TABLE "Tareas" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Tareas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tareas" ADD CONSTRAINT "Tareas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
