import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { genSalt, hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const email = "admin@crate.test"
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.log("Admin already exists. Skipping admin creation...")
  } else {
    const salt = await genSalt(10)
    const passwordHash = await hash("admin123", salt)

    await prisma.user.create({
      data: {
        name: "Admin",
        email,
        passwordHash,
        role: "ADMIN",
      },
    })
    console.log("✅ Admin created:", email, "password: admin123")
  }

  // Add some crates
  const crates = [
    {
      name: "The Essentialist",
      description: "Timeless basics for the modern minimalist. High-quality cotton tees, versatile chinos, and clean accessories."
    },
    {
      name: "Urban Explorer",
      description: "Tactical gear meets street style. Weather-resistant jackets, durable backpacks, and tech-forward apparel."
    },
    {
      name: "Dapper Gent",
      description: "For the man who values sharp lines. Tailored shirts, silk ties, and premium grooming essentials."
    },
    {
      name: "Luxe Lounger",
      description: "Maximum comfort without sacrificing style. Cashmere blends, premium joggers, and artisanal slippers."
    }
  ]

  for (const c of crates) {
    await prisma.crate.create({ data: c })
  }
  console.log(`✅ Seeded ${crates.length} crates.`)
}

main().finally(() => prisma.$disconnect())
