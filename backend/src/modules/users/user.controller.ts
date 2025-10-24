import type { Response } from "express"
import { prisma } from "../../config/db.js"
import type { AuthedRequest } from "../../middlewares/auth.js"

export async function me(req: AuthedRequest, res: Response) {
  const id = req.user!.id
  const user = await prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, role: true } })
  res.json(user)
}
