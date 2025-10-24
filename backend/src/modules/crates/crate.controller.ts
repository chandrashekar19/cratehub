import type { Request, Response } from "express"
import { prisma } from "../../config/db.js"
import { z } from "zod"

const upsertSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.string().optional()
})

export async function list(_req: Request, res: Response) {
  const items = await prisma.crate.findMany({ orderBy: { createdAt: "desc" } })
  res.json(items)
}

export async function getById(req: Request, res: Response) {
  const id = Number(req.params.id)
  const crate = await prisma.crate.findUnique({ where: { id } })
  if (!crate) return res.status(404).json({ error: "Not Found" })
  res.json(crate)
}

export async function create(req: Request, res: Response) {
  const parse = upsertSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: "Invalid payload" })
  const item = await prisma.crate.create({ data: parse.data })
  res.json(item)
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id)
  const parse = upsertSchema.partial().safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: "Invalid payload" })
  const item = await prisma.crate.update({ where: { id }, data: parse.data })
  res.json(item)
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id)
  await prisma.crate.delete({ where: { id } })
  res.json({ id })
}
