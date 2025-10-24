import { Router } from "express"
import { list, getById, create, update, remove } from "./crate.controller.js"
import { requireAuth, requireRole } from "../../middlewares/auth.js"

const router = Router()

router.get("/", list)
router.get("/:id", getById)
router.post("/", requireAuth, requireRole("ADMIN"), create)
router.put("/:id", requireAuth, requireRole("ADMIN"), update)
router.delete("/:id", requireAuth, requireRole("ADMIN"), remove)

export default router
