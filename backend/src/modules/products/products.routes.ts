import { Router } from "express"
import { list, get, create, update, remove } from "./products.controller.js"
import { requireAuth, requireRole } from "../../middlewares/auth.js"

const router = Router()

router.get("/", list)
router.get("/:slug", get)
router.post("/", requireAuth, requireRole("ADMIN"), create)
router.put("/:id", requireAuth, requireRole("ADMIN"), update)
router.delete("/:id", requireAuth, requireRole("ADMIN"), remove)

export default router
