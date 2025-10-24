import { Router } from "express"
import { me } from "./user.controller.js"
import { requireAuth } from "../../middlewares/auth.js"
const router = Router()

router.get("/me", requireAuth, me)
export default router
