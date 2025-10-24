import type { Request, Response } from "express"
import { prisma } from "../../config/db.js"
import { signToken } from "../../utils/jwt.js"
import { z } from "zod"
import { hashPassword, verifyPassword } from "../../utils/password.js"

const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6)
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

export async function signup(req: Request, res: Response) {
  const parse = signupSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: "Invalid payload" })

  const { name, email, password } = parse.data
  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) return res.status(409).json({ error: "Email already registered" })

  const passwordHash = await hashPassword(password)
  const user = await prisma.user.create({ data: { name, email, passwordHash, role: "USER" } })
  const token = signToken({ id: user.id, role: user.role })
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token })
}

export async function login(req: Request, res: Response) {
  const parse = loginSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: "Invalid payload" })

  const { email, password } = parse.data
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(400).json({ error: "Invalid credentials" })

  const ok = await verifyPassword(password, user.passwordHash)
  if (!ok) return res.status(400).json({ error: "Invalid credentials" })

  const token = signToken({ id: user.id, role: user.role })
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token })
}
