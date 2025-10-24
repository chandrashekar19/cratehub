import { Router } from "express"
import { requireAuth, requireRole } from "../../middlewares/auth.js"
import { list, listByUser, create, remove } from "./subscription.controller.js"

const router = Router()

router.get("/", requireAuth, requireRole("ADMIN"), list)
router.get("/me", requireAuth, listByUser)
router.post("/", requireAuth, create)
router.delete("/:id", requireAuth, remove)

export default router
