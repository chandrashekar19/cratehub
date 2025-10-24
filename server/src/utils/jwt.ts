import jwt, { Secret, SignOptions } from "jsonwebtoken"
import { JWT_SECRET } from "../config/env.js"

const SECRET_KEY = JWT_SECRET as Secret

export function signToken(payload: object, expiresIn: SignOptions['expiresIn'] = "7d") {
  return jwt.sign(payload, SECRET_KEY, { expiresIn } as SignOptions)
}

export function verifyToken<T = any>(token: string): T {
  return jwt.verify(token, SECRET_KEY) as T
}
