import type { Request, Response } from "express"
import { prisma } from "../../config/db.js"
import { z } from "zod"

const upsertSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  image: z.string().optional()
})

export async function list(_req: Request, res: Response) {
  const items = await prisma.product.findMany({ orderBy: { createdAt: "desc" } })
  res.json(items)
}

export async function get(req: Request, res: Response) {
  const { slug } = req.params
  const item = await prisma.product.findUnique({ where: { slug } })
  if (!item) return res.status(404).json({ error: "Not Found" })
  res.json(item)
}

export async function create(req: Request, res: Response) {
  const parse = upsertSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: "Invalid payload" })
  const item = await prisma.product.create({ data: parse.data })
  res.json(item)
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id)
  const parse = upsertSchema.partial().safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: "Invalid payload" })
  const item = await prisma.product.update({ where: { id }, data: parse.data })
  res.json(item)
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id)
  await prisma.product.delete({ where: { id } })
  res.json({ id })
}
