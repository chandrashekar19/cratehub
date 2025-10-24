import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { errorHandler } from "./middlewares/error.js"

import authRoutes from "./modules/auth/auth.routes.js"
import userRoutes from "./modules/users/user.routes.js"
import productRoutes from "./modules/products/products.routes.js"
import crateRoutes from "./modules/crates/crate.routes.js"
import subscriptionRoutes from "./modules/subscriptions/subscriptions.routes.js"


const app = express()
app.use(helmet())
app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: "1mb" }))
app.use(morgan("dev"))

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/crates", crateRoutes)
app.use("/api/subscriptions", subscriptionRoutes)

app.use(errorHandler)

export default app
