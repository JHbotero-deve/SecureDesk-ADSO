import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../src/lib/prisma.js";

async function main() {
  const users = [
    { name: "Admin",    email: "admin@securedesk.com",    password: "Admin123*",    role: "ADMIN"    },
    { name: "Analista", email: "analista@securedesk.com", password: "Analista123*", role: "ANALISTA" },
    { name: "Consulta", email: "consulta@securedesk.com", password: "Consulta123*", role: "CONSULTA" }
  ];

  for (const user of users) {
    const passwordHash = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where:  { email: user.email },
      update: {},
      create: { name: user.name, email: user.email, passwordHash, role: user.role }
    });
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });