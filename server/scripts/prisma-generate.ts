import "dotenv/config"
import { execSync } from "child_process"

console.log(".env loaded")
execSync("npx prisma generate", { stdio: "inherit" })
