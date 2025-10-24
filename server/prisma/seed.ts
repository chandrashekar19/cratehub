import "dotenv/config"
import { PrismaClient, Role } from "@prisma/client"
import { genSalt, hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const email = "admin@crate.test"
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.log("Admin already exists.")
    return
  }

  const salt = await genSalt(10)
  const passwordHash = await hash("admin123", salt)

  await prisma.user.create({
    data: {
      name: "Admin",
      email,
      passwordHash,
      role: Role.ADMIN,
    },
  })

  console.log("✅ Admin created:", email, "password: admin123")
}

main().finally(() => prisma.$disconnect())
