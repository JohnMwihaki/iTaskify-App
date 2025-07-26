-- CreateTable
CREATE TABLE "User_Table" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "date_joined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_Table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks_Table" (
    "id" TEXT NOT NULL,
    "task_title" TEXT NOT NULL,
    "task_description" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'high',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "deleted_task" BOOLEAN NOT NULL DEFAULT false,
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Tasks_Table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Table_user_name_key" ON "User_Table"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_Table_emailAddress_key" ON "User_Table"("emailAddress");

-- AddForeignKey
ALTER TABLE "Tasks_Table" ADD CONSTRAINT "Tasks_Table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
