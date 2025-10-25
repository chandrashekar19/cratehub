import { prisma } from "../src/config/db.js"
import { hashPassword } from "../src/utils/password.js"

async function main() {
  const email = "admin@crate.com"
  const password = "admin123"

  const passwordHash = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      name: "Admin User",
      email,
      passwordHash,
      role: "ADMIN"
    }
  })

  console.log("✅ Admin user created:", user)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
