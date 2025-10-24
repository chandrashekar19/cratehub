import type { Response } from "express"
import { prisma } from "../../config/db.js"
import type { AuthedRequest } from "../../middlewares/auth.js"

export async function list(_req: AuthedRequest, res: Response) {
  const items = await prisma.subscription.findMany({
    include: { user: true, crate: true },
    orderBy: { createdAt: "desc" }
  })
  res.json(items)
}

export async function listByUser(req: AuthedRequest, res: Response) {
  const items = await prisma.subscription.findMany({
    where: { userId: req.user!.id },
    include: { crate: true, user: true },
    orderBy: { createdAt: "desc" }
  })
  res.json(items)
}

export async function create(req: AuthedRequest, res: Response) {
  const crateId = Number(req.body.crateId)
  const sub = await prisma.subscription.create({
    data: { crateId, userId: req.user!.id }
  })
  res.json(sub)
}

export async function remove(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id)
  await prisma.subscription.delete({ where: { id } })
  res.json({ id })
}
