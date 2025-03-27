-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "tenure" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "FloorPlan" TEXT NOT NULL,
    "Postcode" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "added_month" TEXT NOT NULL,
    "added_day" INTEGER NOT NULL,
    "added_year" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    CONSTRAINT "Image_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
