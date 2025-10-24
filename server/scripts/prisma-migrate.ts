import "dotenv/config"
import { execSync } from "child_process"

console.log("Loading .env and running migrations...")
execSync("npx prisma migrate dev --schema=./prisma/schema.prisma --name init", {
  stdio: "inherit",
})
