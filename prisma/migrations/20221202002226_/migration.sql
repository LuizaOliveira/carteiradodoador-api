-- CreateTable
CREATE TABLE "donors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" BOOLEAN NOT NULL,
    "situation" BOOLEAN NOT NULL,
    "birthday" TEXT,
    "bloodTypeId" TEXT NOT NULL,
    CONSTRAINT "donors_bloodTypeId_fkey" FOREIGN KEY ("bloodTypeId") REFERENCES "blood_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "blood_types" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "rhFactor" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiresIn" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "donorId" TEXT NOT NULL,
    CONSTRAINT "RefreshToken_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "donors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "donors_email_key" ON "donors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_donorId_key" ON "RefreshToken"("donorId");
