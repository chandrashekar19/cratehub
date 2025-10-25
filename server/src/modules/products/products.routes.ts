import { Router } from "express"
import {
  list,
  getBySlug,
  getById,
  create,
  update,
  remove
} from "./products.controller.js"
import { requireAuth, requireRole } from "../../middlewares/auth.js"

const router = Router()

//  Public
router.get("/", list)
router.get("/slug/:slug", getBySlug)
router.get("/id/:id", getById)

//  Admin Only
router.post("/", requireAuth, requireRole("ADMIN"), create)
router.put("/id/:id", requireAuth, requireRole("ADMIN"), update)
router.delete("/id/:id", requireAuth, requireRole("ADMIN"), remove)

export default router
