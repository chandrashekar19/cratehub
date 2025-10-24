import type { Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt.js"

export interface AuthedRequest extends Request {
  user?: { id: number; role: "USER" | "ADMIN" }
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: "Unauthorized" })
  try {
    req.user = verifyToken(token)
    next()
  } catch {
    res.status(401).json({ error: "Invalid token" })
  }
}

export function requireRole(role: "ADMIN" | "USER") {
  return (req: AuthedRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" })
    if (req.user.role !== role) return res.status(403).json({ error: "Forbidden" })
    next()
  }
}
