/*
  Warnings:

  - You are about to alter the column `expiresIn` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RefreshToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiresIn" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "donorId" TEXT NOT NULL,
    CONSTRAINT "RefreshToken_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "donors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RefreshToken" ("createdAt", "donorId", "expiresIn", "id") SELECT "createdAt", "donorId", "expiresIn", "id" FROM "RefreshToken";
DROP TABLE "RefreshToken";
ALTER TABLE "new_RefreshToken" RENAME TO "RefreshToken";
CREATE UNIQUE INDEX "RefreshToken_donorId_key" ON "RefreshToken"("donorId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
