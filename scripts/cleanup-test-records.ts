import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const del = await db.contactRequest.deleteMany({
  where: { email: { in: ["test@example.com", "e2e@test.it"] } },
});
console.log("Deleted test records:", del.count);
await db.$disconnect();
